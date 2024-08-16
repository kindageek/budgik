import React, { useEffect } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";

import { formatDate, trpc } from "utils";
import type { IExpense, UpdateExpense } from "types";

import Input from "../input/input.component";
import Select from "../select/select.component";
import Dialog, { DialogActions, DialogBody, DialogTitle } from "../dialog";
import useDebounce from "hooks/useDebounce";
import CancelBtn from "components/form/cancel-btn";
import SubmitBtn from "components/form/submit-btn";
import { DEFAULT_FILTERS } from "./constants";

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
  const { data: allExpenses } = trpc.expense.getUserExpenses.useQuery({
    ...DEFAULT_FILTERS,
    month: new Date().getMonth(),
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
    reset,
    setValue,
    setError,
    watch,
    getValues,
  } = useForm<IExpense>({
    defaultValues: data
      ? {
          expenseName: data.name,
          categoryId: data.categoryId,
          value: data.value,
          date: formatDate(data.date),
        }
      : {
          expenseName: "",
          date: formatDate(),
          categoryId: "",
          value: undefined,
        },
  });

  const submitHandler: SubmitHandler<IExpense> = async (data: IExpense) => {
    onSubmit({ ...data, value: Number(data.value) });
  };

  useEffect(() => reset(), [open]);

  useEffect(() => {
    setValue("expenseName", data?.name || "");
    setValue("date", formatDate(data?.date));
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

  const watchExpenseName = watch("expenseName");
  const debouncedExpense: string = useDebounce<string>(watchExpenseName, 300);

  useEffect(() => {
    if (!debouncedExpense) {
      setValue("categoryId", "");
      return;
    }
    if (!allExpenses) return;
    const categoryId = allExpenses.find(
      (expense) => expense.name.toLowerCase() === debouncedExpense.toLowerCase()
    )?.categoryId;
    if (!categoryId) return;
    setValue("categoryId", categoryId);
  }, [debouncedExpense, categories, allExpenses]);

  const handleDateArrowClick = (dir: "next" | "prev") => {
    const value = getValues("date");
    const currentValueDate = new Date(value);
    const newDate = new Date(
      dir === "next"
        ? currentValueDate.setDate(currentValueDate.getDate() + 1)
        : currentValueDate.setDate(currentValueDate.getDate() - 1)
    );
    const newDateString = newDate.toISOString().split("T")[0] || `${value}`;
    setValue("date", newDateString);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle
        title={`${data === null ? "Add" : "Edit"} Expense`}
        onClose={onClose}
      />
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
                  arrowIcons
                  onArrowClick={handleDateArrowClick}
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
        <CancelBtn onClick={onClose} disabled={isLoading} />
        <SubmitBtn
          form="create-expense-form"
          loading={isLoading}
          disabled={
            isLoading ||
            !isDirty ||
            (!isCategoriesLoading && (!categories || categories.length === 0))
          }
        />
      </DialogActions>
    </Dialog>
  );
};

export default ExpenseForm;
