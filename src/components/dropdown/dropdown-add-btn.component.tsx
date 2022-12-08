import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

type Props = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const DropdownAddBtn: React.FC<Props> = ({ onClick }) => {
  return (
    <li
      className={`block cursor-pointer border-t py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white`}
    >
      <button className="button flex items-center" onClick={onClick}>
        <AiOutlinePlus color="black" size={12} className="mr-1" />
        Add
      </button>
    </li>
  );
};

export default DropdownAddBtn;
