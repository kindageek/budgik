import React, { useEffect } from "react";
import { BiErrorCircle, BiCheckCircle } from "react-icons/bi";
import type { SnackbarState } from "types/types";

type Props = {
  onClose: () => void;
  state: SnackbarState | null;
};

const Snackbar: React.FC<Props> = ({ state, onClose }) => {
  useEffect(() => {
    if (state === null) return;
    setTimeout(() => onClose(), 3000);
  }, [state, onClose]);

  return (
    <div
      className={`fixed top-16 my-4 flex items-center rounded border px-4 py-2 ${
        state?.type === "error"
          ? "border-red-400 bg-red-100 text-red-700"
          : "border-green-400 bg-green-100 text-green-700"
      } ${!!state ? "right-4" : "right-[-100%]"} transition-all`}
      role="alert"
    >
      {state?.type === "error" ? (
        <BiErrorCircle size={20} />
      ) : (
        <BiCheckCircle size={20} />
      )}
      <span className="ml-2 block">{state?.msg}</span>
    </div>
  );
};

export default Snackbar;
