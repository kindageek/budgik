import React, { useEffect } from "react";
import useModalState from "hooks/useModalState";
import { AiOutlinePlus } from "react-icons/ai";
import ExpenseForm from "./expense-form.component";
import { trpc } from "utils/trpc";
import type { IExpense } from "types/types";

type Props = {
  onComplete: (msg: string) => void;
};

const CreateExpense: React.FC<Props> = ({ onComplete }) => {
  const { isOpen, onOpen, onClose } = useModalState({ initialOpen: false });

  const {
    mutateAsync: addExpense,
    isLoading,
    error,
    reset,
  } = trpc.expense.create.useMutation({
    onSuccess: (data) => {
      onComplete(data.message);
      onClose();
    },
  });

  const handleFormComplete = (data: IExpense) => {
    addExpense({ ...data, name: data.expenseName }).catch((e) => {
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
      <ExpenseForm
        open={isOpen}
        onClose={onClose}
        onSubmit={handleFormComplete}
        errorMessage={error?.message}
        isLoading={isLoading}
      />
    </>
  );
};

export default CreateExpense;
