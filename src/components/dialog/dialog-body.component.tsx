import React from "react";

type Props = {
  children: React.ReactNode;
};

const DialogBody: React.FC<Props> = ({ children }) => {
  return (
    <div className="relative flex-auto p-6">
      {children}
    </div>
  );
};

export default DialogBody;
