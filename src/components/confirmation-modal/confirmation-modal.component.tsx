import React from "react";
import CloseIconButton from "../buttons/close-icon-button.component";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
};

const ConfirmationModal: React.FC<Props> = ({
  open,
  onClose,
  onSubmit,
  title,
}) => {
  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
        <div className="relative my-6 mx-auto w-full max-w-xl">
          <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
            <div className="flex items-center justify-end rounded-t p-5">
              <CloseIconButton onClick={onClose} />
            </div>
            <div className="relative flex flex-auto items-center justify-center p-6">
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                {title}
              </h3>
            </div>
            <div className="flex items-center justify-evenly rounded-b p-6">
              <button
                className="background-transparent mr-2 rounded-lg px-6 py-2.5 text-sm font-bold uppercase text-indigo-400 outline-none transition-all duration-150 ease-linear hover:bg-indigo-50 focus:outline-none"
                type="button"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-medium uppercase text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 disabled:bg-gray-300 disabled:hover:bg-gray-300"
                type="button"
                onClick={onSubmit}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25" />
    </>
  );
};

export default ConfirmationModal;
