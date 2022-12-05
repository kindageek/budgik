import React, { useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";

import { trpc } from "../../../utils/trpc";
import type { NewCategory } from "../../../types/types";
import useModalState from "../../../hooks/useModalState";

import CategoryForm from "../category-form/category-form.component";

type Props = {
  onComplete: (msg: string) => void;
};

const AddCategory: React.FC<Props> = ({ onComplete }) => {
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
      return;
    });
  };

  useEffect(() => reset(), []);

  return (
    <>
      <button
        type="button"
        onClick={onOpen}
        className="flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        <AiOutlinePlus color="white" size={16} className="mr-2" />
        Add
      </button>
      {isOpen ? (
        <CategoryForm
          onClose={onClose}
          onSubmit={handleFormComplete}
          errorMessage={error?.message}
          isLoading={isLoading}
        />
      ) : null}
    </>
  );
};

export default AddCategory;
