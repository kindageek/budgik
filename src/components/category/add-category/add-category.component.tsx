import React, { useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import type { CategoryType } from "@prisma/client";

import { trpc } from "../../../utils/trpc";
import type { NewCategory } from "../../../types/types";
import useModalState from "../../../hooks/useModalState";

import CategoryForm from "../category-form/category-form.component";

type Props = {
  tab: CategoryType;
  onComplete: (msg: string) => void;
};

const AddCategory: React.FC<Props> = ({ tab, onComplete }) => {
  const { isOpen, onOpen, onClose } = useModalState({ initialOpen: false });

  const {
    mutateAsync: addCategory,
    isLoading,
    error,
    reset,
  } = trpc.category.add.useMutation({
    onSuccess: (data) => {
      onComplete(data.message);
      onClose();
    },
  });

  const handleFormComplete = (data: NewCategory) => {
    addCategory(data).catch((e) => {
      console.error(e);
      return;
    });
  };

  useEffect(() => reset(), []);

  return (
    <>
      <button
        type="button"
        onClick={onOpen}
        className="flex items-center rounded-lg bg-secondary-default px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-secondary-dark focus:outline-none focus:ring-4 focus:ring-secondary-light"
      >
        <AiOutlinePlus color="white" size={16} className="mr-2" />
        Add
      </button>
      <CategoryForm
        tab={tab}
        open={isOpen}
        onClose={onClose}
        onSubmit={handleFormComplete}
        errorMessage={error?.message}
        isLoading={isLoading}
      />
    </>
  );
};

export default AddCategory;
