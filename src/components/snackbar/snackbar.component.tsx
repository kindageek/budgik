import React, { useEffect } from "react";
import { BiErrorCircle, BiCheckCircle } from "react-icons/bi";

type Props = {
  open: boolean;
  onClose: () => void;
  message: string | undefined;
  type?: "success" | "error";
};

const Snackbar: React.FC<Props> = ({
  open,
  onClose,
  message,
  type = "success",
}) => {
  useEffect(() => {
    if (!open) return;
    setTimeout(() => onClose(), 3000);
  }, [open, onClose]);

  return (
    <div
      className={`fixed top-16 my-4 flex items-center rounded border px-4 py-2 ${
        type === "error"
          ? "border-red-400 bg-red-100 text-red-700"
          : "border-green-400 bg-green-100 text-green-700"
      } ${open ? "right-4" : "right-[-100%]"} transition-all`}
      role="alert"
    >
      {type === "error" ? (
        <BiErrorCircle size={20} />
      ) : (
        <BiCheckCircle size={20} />
      )}
      <span className="ml-2 block">{message}</span>
    </div>
  );
};

export default Snackbar;
