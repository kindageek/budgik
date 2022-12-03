import React, { useEffect } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";

import type { Category } from "../../../types/types";

import Input from "../../input/input.component";
import CloseIconButton from "../../buttons/close-icon-button.component";

type Props = {
  onClose: () => void;
  onSubmit: (name: string) => void;
  data?: Category | null;
  errorMessage?: string;
  isLoading?: boolean;
};

interface ICategory {
  name: string;
}

const CategoryForm: React.FC<Props> = ({
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
  } = useForm<ICategory>({
    defaultValues: { name: data?.name || "" },
  });

  const submitHandler: SubmitHandler<ICategory> = async (data: ICategory) => {
    onSubmit(data.name);
  };

  useEffect(() => reset(), []);

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
        <div className="relative my-6 mx-auto w-full max-w-xl">
          <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
            <div className="flex items-center justify-between rounded-t border-b border-solid border-slate-200 p-5">
              <h3 className="text-3xl font-semibold">
                {data === null ? "Add" : "Edit"} Category
              </h3>
              <CloseIconButton onClick={onClose} />
            </div>
            <div className="relative flex-auto p-6">
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
              </form>
              {errorMessage && errorMessage?.length > 0 ? (
                <h3 className="text-md mt-4 rounded-md border border-red-500 bg-rose-100 py-1 text-center font-bold text-red-500">
                  {errorMessage}
                </h3>
              ) : null}
            </div>
            <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6">
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
                form="category-form"
                disabled={isLoading || !isDirty}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="fixed inset-0 z-40 bg-black opacity-25"
        onClick={onClose}
      />
    </>
  );
};

export default CategoryForm;
