import React, { useEffect } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";

import { trpc } from "../../../utils/trpc";
import type { IExpense } from "../../../types/types";

import Input from "../../input/input.component";
import Select from "../../select/select.component";
import Dialog, { DialogActions, DialogBody, DialogTitle } from "../../dialog";

type Props = {
  open: boolean;
  onClose: () => void;
  onComplete: (msg: string) => void;
};

const CreateExpenseForm: React.FC<Props> = ({ open, onClose, onComplete }) => {
  const { data: categories, isLoading: isCategoriesLoading } =
    trpc.category.getExpenseCategories.useQuery();
  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
    reset,
    setError,
  } = useForm<IExpense>({
    defaultValues: {
      name: "",
      date: new Date().toISOString().split("T")[0],
      categoryId: "",
      value: undefined,
    },
  });

  const {
    mutateAsync: create,
    isLoading,
    error,
  } = trpc.expense.create.useMutation({
    onSuccess: (data) => {
      reset();
      onComplete(data.message);
    },
    onError: () => {
      reset();
    },
  });

  const onSubmit: SubmitHandler<IExpense> = async (data: IExpense) => {
    create({ ...data, value: Number(data.value) });
  };

  useEffect(() => reset(), []);

  useEffect(() => {
    if (isCategoriesLoading || (categories && categories?.length > 0)) return;
    setError("categoryId", {
      message:
        "You do not have any categories yet. Please add a category first!",
    });
  }, [categories, isCategoriesLoading]);

  if (!open) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle title="Add New Expense" onClose={onClose} />
      <DialogBody>
        <form
          id="create-expense-form"
          className="space-y-4 md:space-y-6"
          onSubmit={handleSubmit(onSubmit)}
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
            name="name"
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
                  error={!!errors.name}
                  errorMessage={errors?.name?.message?.toString()}
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
        {error && error?.message?.length > 0 ? (
          <h3 className="text-md mt-4 rounded-md border border-red-500 bg-rose-100 py-1 text-center font-bold text-red-500">
            {error?.message}
          </h3>
        ) : null}
      </DialogBody>
      <DialogActions>
        <button
          className="background-transparent mr-2 rounded-lg px-6 py-2.5 text-sm font-bold uppercase text-indigo-400 outline-none transition-all duration-150 ease-linear hover:bg-indigo-50 focus:outline-none"
          type="button"
          onClick={onClose}
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-medium uppercase text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 disabled:bg-gray-300 disabled:hover:bg-gray-300"
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

export default CreateExpenseForm;
