import React from "react";
import useModalState from "../../../hooks/useModalState";
import CreateExpenseForm from "./create-expense-form.component";

type Props = {
  onComplete: () => void;
};

const CreateExpense: React.FC<Props> = ({ onComplete }) => {
  const { isOpen, onOpen, onClose } = useModalState({ initialOpen: false });

  const handleFormComplete = () => {
    onComplete();
    onClose();
  };

  return (
    <>
      <button
        type="button"
        onClick={onOpen}
        className="block rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        Add
      </button>
      {isOpen ? (
        <CreateExpenseForm onClose={onClose} onComplete={handleFormComplete} />
      ) : null}
    </>
  );
};

export default CreateExpense;
