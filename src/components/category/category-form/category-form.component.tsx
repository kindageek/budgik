import React, { useEffect } from "react";
import type { Category, CategoryType } from "@prisma/client";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";

import type { NewCategory } from "../../../types/types";

import Input from "../../input/input.component";
import Select from "../../select/select.component";
import Dialog, { DialogActions, DialogBody, DialogTitle } from "../../dialog";
import CancelBtn from "components/form/cancel-btn";
import SubmitBtn from "components/form/submit-btn";

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
        <CancelBtn onClick={onClose} disabled={isLoading} />
        <SubmitBtn form="category-form" disabled={isLoading || !isDirty} />
      </DialogActions>
    </Dialog>
  );
};

export default CategoryForm;
