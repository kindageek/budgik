import React from "react";

type Props = {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
};

const Dialog: React.FC<Props> = ({ children, open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 bg-[rgba(0,0,0,0.5)]" onClick={onClose}>
      <div
        className="fixed inset-0 top-[50%] left-[50%] z-50 flex w-full translate-x-[-50%] translate-y-[-50%] items-center justify-center outline-none focus:outline-none sm:max-w-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative my-6 px-4 sm:mx-auto w-full overflow-y-auto overflow-x-hidden">
          <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
