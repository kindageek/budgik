import React, { useEffect } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";

import { trpc } from "../../utils/trpc";
import type { IExpense, UpdateExpense } from "../../types/types";

import Input from "../input/input.component";
import Select from "../select/select.component";
import Dialog, { DialogActions, DialogBody, DialogTitle } from "../dialog";
import useDebounce from "../../hooks/useDebounce";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: IExpense) => void;
  data?: UpdateExpense | null;
  errorMessage?: string;
  isLoading?: boolean;
};

const ExpenseForm: React.FC<Props> = ({
  open,
  onClose,
  onSubmit,
  data = null,
  errorMessage = null,
  isLoading = false,
}) => {
  const { data: categories, isLoading: isCategoriesLoading } =
    trpc.category.getExpenseCategories.useQuery();

  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
    reset,
    setValue,
    setError,
    getValues,
  } = useForm<IExpense>({
    defaultValues: data
      ? { ...data, date: data?.date.toISOString().split("T")[0] }
      : {
          expenseName: "",
          date: new Date().toISOString().split("T")[0],
          categoryId: "",
          value: undefined,
        },
  });

  const submitHandler: SubmitHandler<IExpense> = async (
    data: IExpense
  ) => {
    onSubmit({ ...data, value: Number(data.value) });
  };

  useEffect(() => reset(), [open]);

  useEffect(() => {
    setValue("expenseName", data?.name || "");
    setValue("date", data?.date.toISOString().split("T")[0] || "");
    setValue("categoryId", data?.categoryId || "");
    setValue("value", data?.value || 0);
  }, [data]);

  useEffect(() => {
    if (isCategoriesLoading || (categories && categories?.length > 0)) return;
    setError("categoryId", {
      message:
        "You do not have any categories yet. Please add a category first!",
    });
  }, [categories, isCategoriesLoading, open]);

  const debouncedExpense: string = useDebounce<string>(
    getValues().expenseName,
    300
  );

  useEffect(() => {
    if (!debouncedExpense) return;
    const category = categories?.find(
      (category) => category.name === debouncedExpense
    );
    if (!category) return;
    setValue("categoryId", category.id);
  }, [debouncedExpense, categories]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle title="Edit Expense" onClose={onClose} />
      <DialogBody>
        <form
          id="create-expense-form"
          className="space-y-4 md:space-y-6"
          onSubmit={handleSubmit(submitHandler)}
        >
          <Controller
            name="date"
            control={control}
            rules={{ required: "Required" }}
            render={({ field }) => {
              return (
                <Input
                  label="Date"
                  type="date"
                  id="date"
                  placeholder="Date"
                  required
                  error={!!errors.date}
                  errorMessage={errors?.date?.message?.toString()}
                  {...field}
                />
              );
            }}
          />
          <Controller
            name="expenseName"
            control={control}
            rules={{ required: "Required" }}
            render={({ field }) => {
              return (
                <Input
                  label="Name"
                  type="text"
                  id="name"
                  placeholder="Name"
                  required
                  error={!!errors.expenseName}
                  errorMessage={errors?.expenseName?.message?.toString()}
                  {...field}
                />
              );
            }}
          />
          <Controller
            name="categoryId"
            control={control}
            rules={{ required: "Required" }}
            render={({ field }) => {
              return (
                <Select
                  required
                  label="Category"
                  id="categoryId"
                  error={!!errors.categoryId}
                  errorMessage={errors?.categoryId?.message?.toString()}
                  {...field}
                >
                  <option selected>Choose a category</option>
                  {categories?.map(({ id, name }) => (
                    <option value={id} key={id}>
                      {name}
                    </option>
                  ))}
                </Select>
              );
            }}
          />
          <Controller
            name="value"
            control={control}
            rules={{ required: "Required" }}
            render={({ field }) => {
              return (
                <Input
                  label="Amount"
                  type="number"
                  id="value"
                  min={0}
                  step={0.01}
                  placeholder="Amount"
                  required
                  error={!!errors.value}
                  errorMessage={errors?.value?.message?.toString()}
                  {...field}
                />
              );
            }}
          />
        </form>
        {errorMessage && errorMessage?.length > 0 ? (
          <h3 className="text-md mt-4 rounded-md border border-red-500 bg-rose-100 py-1 text-center font-bold text-red-500">
            {errorMessage}
          </h3>
        ) : null}
      </DialogBody>
      <DialogActions>
        <button
          className="background-transparent mr-2 rounded-lg px-6 py-2.5 text-sm font-bold uppercase text-secondary-dark outline-none transition-all duration-150 ease-linear hover:bg-secondary-100 focus:outline-none"
          type="button"
          onClick={onClose}
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          className="rounded-lg bg-secondary-default px-6 py-2.5 text-sm font-medium uppercase text-white hover:bg-secondary-dark focus:outline-none focus:ring-4 focus:ring-secondary-light disabled:bg-gray-300 disabled:hover:bg-gray-300"
          type="submit"
          form="create-expense-form"
          disabled={
            isLoading ||
            !isDirty ||
            (!isCategoriesLoading && (!categories || categories.length === 0))
          }
        >
          Save
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default ExpenseForm;
