import React from "react";
import CloseIconButton from "../buttons/close-icon-button.component";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  subtitle?: string;
  type?: "success" | "error";
};

const ConfirmationModal: React.FC<Props> = ({
  open,
  onClose,
  onSubmit,
  title,
  subtitle = null,
  type = "error",
}) => {
  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
        <div className="relative my-6 mx-auto w-full max-w-xl px-4">
          <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
            <div className="flex items-center justify-end rounded-t px-5 py-2.5 sm:p-5">
              <CloseIconButton onClick={onClose} />
            </div>
            <div className="relative flex flex-auto flex-col items-center justify-center px-5 py-2.5 sm:p-5">
              <h3 className="mb-3 text-center text-lg font-semibold text-gray-900 dark:text-gray-200 sm:mb-5 sm:text-xl">
                {title}
              </h3>
              {subtitle ? (
                <h5 className="sm:text-md mb-3 text-center text-base font-normal text-gray-700 dark:text-gray-400 sm:mb-5">
                  {subtitle}
                </h5>
              ) : null}
            </div>
            <div className="flex items-center justify-evenly rounded-b px-5 py-2.5 sm:p-5">
              <button
                className="background-transparent mr-2 rounded-lg px-6 py-2.5 text-sm font-bold uppercase text-gray-600 outline-none transition-all duration-150 ease-linear hover:bg-gray-100 focus:outline-none"
                type="button"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className={`rounded-lg px-6 py-2.5 text-sm font-medium uppercase text-white focus:outline-none focus:ring-4 focus:ring-secondary-light disabled:bg-gray-300 disabled:hover:bg-gray-300 ${
                  type === "error"
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                }`}
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
