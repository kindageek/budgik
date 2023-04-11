import React, { useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";

import useModalState from "hooks/useModalState";

import DropdownButton from "./dropdown-button.component";
import DropdownAddBtn from "./dropdown-add-btn.component";
import DropdownAddForm from "./dropdown-add-form.component";
import DropdownRemoveBtn from "./dropdown-remove-btn.component";

type Props = {
  value: string;
  onChange: (value: string) => void;
  formatter?: (value: string) => string;
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
  formatter = null,
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

  const handleToggle = () => {
    setInputValue("");
    closeForm();
    onToggle();
  };

  const ref = useDetectClickOutside({ onTriggered: handleClose });

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!onAdd) return;
    closeForm();
    setInputValue("");
    onAdd(inputValue);
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
        text={formatter ? formatter(value) : value}
        onClick={handleToggle}
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
                  handleToggle();
                }}
                className={`block cursor-pointer py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${
                  text === value ? "bg-gray-100 font-bold" : ""
                }`}
              >
                <div className="flex w-full items-center justify-between">
                  {formatter ? formatter(text) : text}
                  {onRemove !== null ? (
                    <DropdownRemoveBtn value={text} onClick={handleRemove} />
                  ) : null}
                </div>
              </li>
            ))}
            {onAdd !== null ? (
              isFormOpen ? (
                <DropdownAddForm
                  value={inputValue}
                  onChange={setInputValue}
                  onSubmit={handleFormSubmit}
                />
              ) : (
                <DropdownAddBtn onClick={handleAddClick} />
              )
            ) : null}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default Dropdown;
