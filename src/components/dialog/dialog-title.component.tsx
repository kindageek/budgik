import React from "react";
import CloseIconButton from "../buttons/close-icon-button.component";

type Props = {
  title: string;
  hideCloseIcon?: boolean;
  onClose: () => void;
};

const DialogTitle: React.FC<Props> = ({ title, onClose }) => {
  return (
    <div className="flex items-center justify-between rounded-t border-b border-solid border-slate-200 px-5 py-2.5 sm:p-5">
      <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold">{title}</h3>
      <CloseIconButton onClick={onClose} />
    </div>
  );
};

export default DialogTitle;
