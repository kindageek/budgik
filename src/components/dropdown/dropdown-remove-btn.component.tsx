import React from "react";
import { IoMdClose } from "react-icons/io";

type Props = {
  value: string;
  onClick: (value: string) => void;
};

const DropdownRemoveBtn: React.FC<Props> = ({ value, onClick }) => {
  return (
    <span
      className="cursor-pointer rounded-full p-1 hover:bg-gray-200"
      onClick={() => onClick(value)}
    >
      <IoMdClose size={12} color="black" />
    </span>
  );
};

export default DropdownRemoveBtn;
