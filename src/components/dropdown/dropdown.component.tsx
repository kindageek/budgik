import React, { useState } from "react";
import useModalState from "../../hooks/useModalState";
import DropdownButton from "./dropdown-button.component";
import { useDetectClickOutside } from "react-detect-click-outside";
import { AiOutlinePlus } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";

type Props = {
  value: string;
  onChange: (value: string) => void;
  values: string[];
  fullWidth?: boolean;
  error?: boolean;
  errorMessage?: string;
  active?: boolean;
  onAdd?: (value: string) => void;
  onRemove?: (value: string) => void;
};

const Dropdown: React.FC<Props> = ({
  value,
  values,
  onChange,
  fullWidth = false,
  active = false,
  error = false,
  errorMessage,
  onAdd = null,
  onRemove = null,
}) => {
  const { isOpen, onToggle, onClose } = useModalState({ initialOpen: false });
  const {
    isOpen: isFormOpen,
    onOpen: openForm,
    onClose: closeForm,
  } = useModalState({ initialOpen: false });

  const [inputValue, setInputValue] = useState("");

  const handleClose = () => {
    setInputValue("");
    closeForm();
    onClose();
  };

  const ref = useDetectClickOutside({ onTriggered: handleClose });

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!onAdd) return;
    closeForm();
    setInputValue("");
    onAdd(inputValue);
    onClose();
  };

  const handleAddClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    openForm();
  };

  const handleRemove = (value: string) => {
    if (!onRemove) return;
    closeForm();
    onRemove(value);
  };

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
                <div className="flex w-full items-center justify-between">
                  {text}
                  {onRemove !== null ? (
                    <span className="cursor pointer rounded-full p-1 hover:bg-gray-200" onClick={() => handleRemove(text)}>
                      <IoMdClose size={12} color="black" />
                    </span>
                  ) : null}
                </div>
              </li>
            ))}
            {onAdd !== null ? (
              isFormOpen ? (
                <li
                  className={`block cursor-pointer border-t py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white`}
                >
                  <form onSubmit={handleFormSubmit} className="w-full">
                    <input
                      autoFocus
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="input w-full rounded border py-1 px-1.5"
                    />
                  </form>
                </li>
              ) : (
                <li
                  className={`block cursor-pointer border-t py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white`}
                >
                  <button
                    className="button flex items-center"
                    onClick={handleAddClick}
                  >
                    <AiOutlinePlus color="black" size={12} className="mr-1" />
                    Add
                  </button>
                </li>
              )
            ) : null}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default Dropdown;
