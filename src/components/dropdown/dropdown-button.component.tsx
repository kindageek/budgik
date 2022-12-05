import React from "react";
import { FiChevronDown } from "react-icons/fi";

type Props = {
  text: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  error?: boolean;
  errorMessage?: string;
};

const DropdownButton: React.FC<Props> = ({
  text,
  onClick,
  error = false,
  errorMessage = null,
}) => {
  return (
    <button
      className="inline-flex w-full items-center justify-between rounded-lg border bg-gray-50 px-4 py-2.5 text-center text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-0 focus:ring-transparent"
      type="button"
      onClick={onClick}
    >
      {text}
      <FiChevronDown size={16} className="ml-4" />
    </button>
  );
};

export default DropdownButton;
