import React from "react";
import useModalState from "../../../hooks/useModalState";
import CreateExpenseForm from "./create-expense-form.component";
import { AiOutlinePlus } from "react-icons/ai";

type Props = {
  onComplete: (msg: string) => void;
};

const CreateExpense: React.FC<Props> = ({ onComplete }) => {
  const { isOpen, onOpen, onClose } = useModalState({ initialOpen: false });

  const handleFormComplete = (msg: string) => {
    onComplete(msg);
    onClose();
  };

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
      <CreateExpenseForm
        open={isOpen}
        onClose={onClose}
        onComplete={handleFormComplete}
      />
    </>
  );
};

export default CreateExpense;
