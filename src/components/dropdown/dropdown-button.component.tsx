import React from "react";
import { FiChevronDown } from "react-icons/fi";

type Props = {
  text: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  active?: boolean;
  error?: boolean;
  errorMessage?: string;
};

const DropdownButton: React.FC<Props> = ({
  text,
  onClick,
  active = false,
  error = false,
  errorMessage = null,
}) => {
  return (
    <button
      className={`inline-flex w-full items-center justify-between rounded-lg border bg-gray-50 px-4 py-2.5 text-center text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-0 focus:ring-transparent ${
        error ? "border-red-500" : active ? "border-blue-500" : ""
      }`}
      type="button"
      onClick={onClick}
    >
      {text}
      <FiChevronDown size={16} className="ml-4" />
      {errorMessage && errorMessage?.length > 0 ? (
        <span className="absolute left-0 bottom-[-16px] text-xs text-red-500">
          {errorMessage}
        </span>
      ) : null}
    </button>
  );
};

export default DropdownButton;
