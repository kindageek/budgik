import React from "react";
import useModalState from "../../hooks/useModalState";
import DropdownButton from "./dropdown-button.component";
import { useDetectClickOutside } from "react-detect-click-outside";

type Props = {
  value: string;
  onChange: (value: string) => void;
  values: string[];
  fullWidth?: boolean;
  error?: boolean;
  errorMessage?: string;
  active?: boolean;
};

const Dropdown: React.FC<Props> = ({
  value,
  values,
  onChange,
  fullWidth = false,
  active = false,
  error = false,
  errorMessage,
}) => {
  const { isOpen, onToggle, onClose } = useModalState({ initialOpen: false });

  const ref = useDetectClickOutside({ onTriggered: onClose });

  return (
    <div className={`relative ${fullWidth ? "w-full" : ""}`} ref={ref}>
      <DropdownButton
        active={active}
        text={value}
        onClick={onToggle}
        error={error}
        errorMessage={errorMessage}
      />
      {isOpen ? (
        <div className="absolute left-0 bottom-0 z-10 w-full translate-y-full divide-y divide-gray-200 rounded bg-white shadow-md dark:bg-gray-700">
          <ul
            className="py-1 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefault"
          >
            {values?.map((text, index) => (
              <li
                key={index}
                onClick={() => {
                  onChange(text);
                  onToggle();
                }}
                className={`block cursor-pointer py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${
                  text === value ? "bg-gray-100 font-bold" : ""
                }`}
              >
                {text}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default Dropdown;
