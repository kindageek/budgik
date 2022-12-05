import React from "react";
import useModalState from "../../hooks/useModalState";
import DropdownButton from "./dropdown-button.component";

type Props = {
  value: string;
  onChange: (value: string) => void;
  values: string[];
  fullWidth?: boolean;
};

const Dropdown: React.FC<Props> = ({
  value,
  values,
  onChange,
  fullWidth = false,
}) => {
  const { isOpen, onToggle } = useModalState({ initialOpen: false });
  return (
    <div className={`relative ${fullWidth ? "w-full" : ""}`}>
      <DropdownButton text={value} onClick={onToggle} />
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
