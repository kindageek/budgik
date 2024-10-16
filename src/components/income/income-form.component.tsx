import React, { useEffect } from "react";
import type { Income } from "@prisma/client";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";

import { trpc, formatDate } from "utils";
import type { NewIncome } from "types";

import Input from "../input/input.component";
import Select from "../select/select.component";
import Dialog, { DialogActions, DialogBody, DialogTitle } from "../dialog";
import useDebounce from "../../hooks/useDebounce";
import CancelBtn from "components/form/cancel-btn";
import SubmitBtn from "components/form/submit-btn";
import { DEFAULT_FILTERS } from "./constants";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: NewIncome) => void;
  data?: Income | null;
  errorMessage?: string;
  isLoading?: boolean;
};

const IncomeForm: React.FC<Props> = ({
  open,
  onClose,
  onSubmit,
  data = null,
  errorMessage = null,
  isLoading = false,
}) => {
  const { data: categories, isLoading: isCategoriesLoading } =
    trpc.category.getIncomeCategories.useQuery();
  const { data: allIncomes } =
    trpc.income.getUserIncome.useQuery(DEFAULT_FILTERS);

  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
    reset,
    setValue,
    setError,
    watch,
    getValues,
  } = useForm<NewIncome>({
    defaultValues: data
      ? {
          incomeName: data.name,
          categoryId: data.categoryId,
          value: data.value,
          date: formatDate(data.date),
        }
      : {
          incomeName: "",
          date: formatDate(),
          categoryId: "",
          value: undefined,
        },
  });

  const submitHandler: SubmitHandler<NewIncome> = async (data: NewIncome) => {
    onSubmit({ ...data, value: Number(data.value) });
  };

  useEffect(() => reset(), [open]);

  useEffect(() => {
    setValue("incomeName", data?.name || "");
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

  const watchIncomeName = watch("incomeName");
  const debouncedIncome: string = useDebounce<string>(watchIncomeName, 300);

  useEffect(() => {
    if (!debouncedIncome) {
      setValue("categoryId", "");
      return;
    }
    if (!allIncomes) return;
    const categoryId = allIncomes.find(
      (income) => income.name.toLowerCase() === debouncedIncome.toLowerCase()
    )?.categoryId;
    if (!categoryId) return;
    setValue("categoryId", categoryId);
  }, [debouncedIncome, categories, allIncomes]);

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
        title={`${data === null ? "Add" : "Edit"} Income`}
        onClose={onClose}
      />
      <DialogBody>
        <form
          id="income-form"
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
            name="incomeName"
            control={control}
            rules={{ required: "Required" }}
            render={({ field }) => {
              return (
                <Input
                  label="Name"
                  type="text"
                  id="incomeName"
                  placeholder="Name"
                  required
                  error={!!errors.incomeName}
                  errorMessage={errors?.incomeName?.message?.toString()}
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
          form="income-form"
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

export default IncomeForm;
