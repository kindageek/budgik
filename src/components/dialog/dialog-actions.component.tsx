import React from "react";

type Props = {
  children: React.ReactNode;
};

const DialogActions: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6">
      {children}
    </div>
  );
};

export default DialogActions;
