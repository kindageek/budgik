import React from "react";

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  label?: string;
  error?: boolean;
  errorMessage?: string;
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  label = null,
  error = false,
  errorMessage = null,
  required = false,
  name,
  ...props
}) => {
  return (
    <div className="relative">
      {label && (
        <label
          htmlFor={name}
          className="mb-2 block text-sm font-medium text-gray-900"
        >
          {label}
          {required ? <span className="text-red-500">*</span> : ""}
        </label>
      )}
      <div className="flex">
        <input
          required={required}
          name={name}
          className={`block w-full rounded-lg border bg-gray-50 p-2.5 text-gray-900 focus:border-indigo-600 focus:outline-none focus:ring-indigo-600 sm:text-sm ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          {...props}
        />
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
