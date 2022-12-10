import React from "react";
import { BsChevronDown } from "react-icons/bs";

interface InputProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: boolean;
  errorMessage?: string;
  icon?: React.ReactNode;
}

const Select: React.FC<InputProps> = ({
  label = null,
  error = false,
  errorMessage = null,
  required = false,
  name,
  children,
  className,
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
      <div className="relative flex w-full">
        <select
          required={required}
          name={name}
          className={`${className} form-select pr-6.5 block w-full cursor-pointer rounded-lg border bg-gray-50 p-2.5 text-gray-900 hover:border-primary-default focus:border-primary-dark focus:outline-none focus:ring-primary-dark sm:text-sm ${
            error ? "border-red-500" : "border-gray-300"
          } appearance-none bg-clip-padding bg-no-repeat transition ease-in-out`}
          {...props}
        >
          {children}
        </select>
        <BsChevronDown
          size={12}
          className="absolute right-2.5 top-0 h-full cursor-pointer"
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

export default Select;
