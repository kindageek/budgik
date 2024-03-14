import React, { useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";

import { trpc } from "utils";
import type { NewIncome } from "types";
import useModalState from "hooks/useModalState";

import IncomeForm from "./income-form.component";

type Props = {
  onComplete: (msg: string) => void;
};

const AddIncome: React.FC<Props> = ({ onComplete }) => {
  const { isOpen, onOpen, onClose } = useModalState({ initialOpen: false });

  const {
    mutateAsync: addIncome,
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
    addIncome({ ...data, name: data.incomeName }).catch((e) => {
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
        className="flex items-center gap-2 rounded-lg border border-secondary-default bg-secondary-default p-2 text-center text-sm font-medium leading-4 text-white hover:border-secondary-dark hover:bg-secondary-dark focus:outline-none focus:ring-4 focus:ring-secondary-light md:p-2.5 lg:px-5"
      >
        <AiOutlinePlus color="white" size={16} />
        <span className="hidden lg:block">Add</span>
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
