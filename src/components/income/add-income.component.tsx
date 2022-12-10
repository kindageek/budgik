import React, { useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";

import { trpc } from "../../utils/trpc";
import type { NewIncome } from "../../types/types";
import useModalState from "../../hooks/useModalState";

import IncomeForm from "./income-form.component";

type Props = {
  onComplete: (msg: string) => void;
};

const AddIncome: React.FC<Props> = ({ onComplete }) => {
  const { isOpen, onOpen, onClose } = useModalState({ initialOpen: false });

  const {
    mutateAsync: addCategory,
    isLoading,
    error,
    reset,
  } = trpc.income.create.useMutation({
    onSuccess: (data) => {
      onComplete(data.message);
      onClose();
    },
  });

  const handleFormComplete = (data: NewIncome) => {
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
        className="flex items-center rounded-lg bg-secondary-default px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-secondary-dark focus:outline-none focus:ring-4 focus:ring-secondary-light"
      >
        <AiOutlinePlus color="white" size={16} className="mr-2" />
        Add
      </button>
      <IncomeForm
        open={isOpen}
        onClose={onClose}
        onSubmit={handleFormComplete}
        errorMessage={error?.message}
        isLoading={isLoading}
      />
    </>
  );
};

export default AddIncome;
