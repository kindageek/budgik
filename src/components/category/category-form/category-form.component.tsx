import React, { useEffect } from "react";
import type { Category, CategoryType } from "@prisma/client";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";

import type { NewCategory } from "../../../types/types";

import Input from "../../input/input.component";
import Select from "../../select/select.component";
import Dialog, { DialogActions, DialogBody, DialogTitle } from "../../dialog";

type Props = {
  tab: CategoryType;
  open: boolean;
  onClose: () => void;
  onSubmit: (data: NewCategory) => void;
  data?: Category | null;
  errorMessage?: string;
  isLoading?: boolean;
};

const CategoryForm: React.FC<Props> = ({
  tab,
  open,
  onClose,
  onSubmit,
  data = null,
  errorMessage = null,
  isLoading = false,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
    reset,
    setValue,
  } = useForm<NewCategory>({
    defaultValues: {
      name: data?.name || "",
      type: data?.type || tab,
    },
  });

  const submitHandler: SubmitHandler<NewCategory> = async (
    data: NewCategory
  ) => {
    onSubmit(data);
  };

  useEffect(() => reset(), [open]);

  useEffect(() => {
    setValue("name", data?.name || "");
    setValue("type", data?.type || tab);
  }, [data, tab]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle
        title={`${data === null ? "Add" : "Edit"} Category`}
        onClose={onClose}
      />
      <DialogBody>
        <form
          id="category-form"
          className="space-y-4 md:space-y-6"
          onSubmit={handleSubmit(submitHandler)}
        >
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
            name="type"
            control={control}
            rules={{ required: "Required" }}
            render={({ field }) => {
              return (
                <Select
                  required
                  label="Type"
                  id="type"
                  error={!!errors.type}
                  errorMessage={errors?.type?.message?.toString()}
                  {...field}
                >
                  <option selected>Choose a type</option>
                  <option value="EXPENSE">Expense</option>
                  <option value="INCOME">Income</option>
                </Select>
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
          form="category-form"
          disabled={isLoading || !isDirty}
        >
          Save
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryForm;
