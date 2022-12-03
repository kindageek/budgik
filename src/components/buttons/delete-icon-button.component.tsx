import React from "react";
import { RiDeleteBin5Line } from "react-icons/ri";

type Props = {
  onClick: () => void;
};

const DeleteIconButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="hover:text-red-500"
      title="Delete"
    >
      <RiDeleteBin5Line size={20} />
    </button>
  );
};

export default DeleteIconButton;
