import React from "react";
import { MONTHS } from "utils";
import Dropdown from "../dropdown/dropdown.component";
import type { MonthName } from "types";

type Props = {
  month: number;
  onSelect: (monthNum: number) => void;
};

const MonthSelect: React.FC<Props> = ({ month, onSelect }) => {
  const handleMonthChange = (month: string) => {
    onSelect(MONTHS.indexOf(month as MonthName) + 1);
  };

  return (
    <div className="flex w-full max-w-[12rem] items-center">
      <Dropdown
        value={MONTHS[month - 1] || ""}
        values={MONTHS}
        onChange={handleMonthChange}
        fullWidth
      />
    </div>
  );
};

export default MonthSelect;
