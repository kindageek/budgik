import React from "react";
import { BsThreeDots } from "react-icons/bs";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import EditIconButton from "components/buttons/edit-icon-button.component";
import DeleteIconButton from "components/buttons/delete-icon-button.component";
import DuplicateIconButton from "components/buttons/duplicate-icon-button.component";

type Props = {
  onEditRow?: () => void;
  onDeleteRow?: () => void;
  onDuplicateRow?: () => void;
};

const ExpensesTableRowActions: React.FC<Props> = ({
  onEditRow,
  onDeleteRow,
  onDuplicateRow,
}) => {
  return (
    <div className="flex items-center justify-center">
      <div className="hidden items-center justify-center gap-4 md:flex">
        {onEditRow && <EditIconButton onClick={onEditRow} />}
        {onDeleteRow && <DeleteIconButton onClick={onDeleteRow} />}
        {onDuplicateRow && <DuplicateIconButton onClick={onDuplicateRow} />}
      </div>
      <div className="flex items-center justify-center md:hidden">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              className="button rounded-full p-2 hover:bg-gray-100"
              aria-label="actions-toggle"
            >
              <BsThreeDots size={16} />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content className="flex flex-col gap-4 rounded-lg border bg-white py-2 px-4 shadow-md">
              {onEditRow && (
                <DropdownMenu.Item>
                  <EditIconButton onClick={onEditRow} />
                </DropdownMenu.Item>
              )}
              {onDeleteRow && (
                <DropdownMenu.Item>
                  <DeleteIconButton onClick={onDeleteRow} />
                </DropdownMenu.Item>
              )}
              {onDuplicateRow && (
                <DropdownMenu.Item>
                  <DuplicateIconButton onClick={onDuplicateRow} />
                </DropdownMenu.Item>
              )}
              <DropdownMenu.Arrow />
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </div>
  );
};

export default ExpensesTableRowActions;
