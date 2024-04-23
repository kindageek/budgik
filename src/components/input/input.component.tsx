import IconBtn from "components/form/icon-btn";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  errorMessage?: string;
  icon?: React.ReactNode;
  arrowIcons?: boolean;
  onArrowClick?: (dir: "next" | "prev") => void;
}

const Input: React.FC<InputProps> = ({
  label = null,
  error = false,
  errorMessage = null,
  required = false,
  name,
  arrowIcons = false,
  onArrowClick,
  ...props
}) => {
  return (
    <div className="relative w-full">
      {label && (
        <label
          htmlFor={name}
          className="mb-2 block text-sm font-medium text-gray-900"
        >
          {label}
          {required ? <span className="text-red-500">*</span> : ""}
        </label>
      )}
      <div className="item-center flex w-full justify-between gap-2">
        <input
          required={required}
          name={name}
          className={`block w-full rounded-lg border bg-gray-50 p-2.5 text-gray-900 hover:border-primary-default focus:border-primary-dark focus:outline-none focus:ring-primary-dark sm:text-sm ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          {...props}
        />
        {props.type === "date" && arrowIcons && (
          <IconBtn icon="prev" onClick={() => onArrowClick?.("prev")} />
        )}
        {props.type === "date" && arrowIcons && (
          <IconBtn icon="next" onClick={() => onArrowClick?.("next")} />
        )}
      </div>
      {errorMessage && errorMessage?.length > 0 ? (
        <span className="absolute left-0 -bottom-4 text-xs text-red-500">
          {errorMessage}
        </span>
      ) : (
        ""
      )}
    </div>
  );
};

export default Input;
