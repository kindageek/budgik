import React from "react";
import { GrDuplicate } from "react-icons/gr";

type Props = {
  onClick: () => void;
};

const DuplicateIconButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button type="button" onClick={onClick} className="hover:text-emerald-500">
      <GrDuplicate size={20} />
    </button>
  );
};

export default DuplicateIconButton;
