import React from "react";
import { RiEdit2Line } from "react-icons/ri";

type Props = {
  onClick: () => void;
};

const EditIconButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="hover:text-primary-default"
      title="Edit"
    >
      <RiEdit2Line size={20} />
    </button>
  );
};

export default EditIconButton;
