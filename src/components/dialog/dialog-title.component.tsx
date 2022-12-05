import React from "react";
import CloseIconButton from "../buttons/close-icon-button.component";

type Props = {
  title: string;
  hideCloseIcon?: boolean;
  onClose: () => void;
};

const DialogTitle: React.FC<Props> = ({ title, onClose }) => {
  return (
    <div className="flex items-center justify-between rounded-t border-b border-solid border-slate-200 p-5">
      <h3 className="text-3xl font-semibold">{title}</h3>
      <CloseIconButton onClick={onClose} />
    </div>
  );
};

export default DialogTitle;
