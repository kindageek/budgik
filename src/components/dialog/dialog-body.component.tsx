import React from "react";

type Props = {
  children: React.ReactNode;
};

const DialogBody: React.FC<Props> = ({ children }) => {
  return (
    <div className="relative flex-auto px-5 py-2.5 sm:p-5">
      {children}
    </div>
  );
};

export default DialogBody;
