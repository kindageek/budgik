import * as Popover from "@radix-ui/react-popover";
import Input from "components/input/input.component";
import React, { useState } from "react";
import { BiDuplicate } from "react-icons/bi";

type Props = {
  rowDate: string;
  onClick: (date: string) => void;
};

const DuplicateIconButton: React.FC<Props> = ({ rowDate, onClick }) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [dateInput, setDateInput] = useState(rowDate);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onClick(dateInput);
    setPopoverOpen(false);
  };
  return (
    <Popover.Root open={popoverOpen} onOpenChange={setPopoverOpen}>
      <Popover.Trigger asChild>
        <button
          type="button"
          className="hover:text-emerald-500"
          title="Duplicate"
        >
          <BiDuplicate size={20} />
        </button>
      </Popover.Trigger>
      <Popover.Content className="flex flex-col gap-4 rounded-lg border bg-white py-2 px-4 shadow-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <Input
            type="date"
            value={dateInput}
            required
            onChange={(e) => setDateInput(e.target.value)}
          />
          <button
            type="submit"
            title="Duplicate"
            className="rounded-lg bg-emerald-500 px-4 py-2 text-white hover:bg-emerald-600"
          >
            Duplicate
          </button>
        </form>
      </Popover.Content>
    </Popover.Root>
  );
};

export default DuplicateIconButton;
