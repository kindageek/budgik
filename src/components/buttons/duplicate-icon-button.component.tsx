import React from "react";
import { BiDuplicate } from "react-icons/bi";

type Props = {
  onClick: () => void;
};

const DuplicateIconButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="hover:text-emerald-500"
      title="Duplicate"
    >
      <BiDuplicate size={20} />
    </button>
  );
};

export default DuplicateIconButton;
