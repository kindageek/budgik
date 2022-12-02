import React from "react";
import Select from "../select/select.component";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

type Props = {
  month: number;
  onSelect: (monthNum: number) => void;
};

const MonthSelect: React.FC<Props> = ({ month, onSelect }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(parseInt(e.target.value, 10));
  };
  return (
    <div className="flex items-center w-full max-w-[12rem]">
      <Select value={month} onChange={handleChange} className="w-full">
        {MONTHS.map((name, index) => (
          <option key={name} value={index + 1}>
            {name}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default MonthSelect;
