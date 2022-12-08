import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const DropdownAddForm: React.FC<Props> = ({ value, onChange, onSubmit }) => {
  return (
    <li
      className={`block cursor-pointer border-t py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white`}
    >
      <form onSubmit={onSubmit} className="relative">
        <input
          autoFocus
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="input w-full rounded border py-1 pl-1 pr-4"
        />
        <button
          type="submit"
          className="absolute right-1.5 top-[50%] translate-y-[-50%] cursor-pointer"
        >
          <AiOutlinePlus size={12} className="text-gray-500 hover:text-black" />
        </button>
      </form>
    </li>
  );
};

export default DropdownAddForm;
