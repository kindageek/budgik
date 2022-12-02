import React from "react";
import { IoMdClose } from "react-icons/io";

type Props = {
  onClick: () => void;
};

const CloseIconButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full p-1 hover:bg-gray-100"
    >
      <IoMdClose size={20} />
    </button>
  );
};

export default CloseIconButton;
