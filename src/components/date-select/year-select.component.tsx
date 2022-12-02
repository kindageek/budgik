import React from "react";
import Select from "../select/select.component";

const YEARS = [2022, 2023, 2024];

type Props = {
  year: number;
  onSelect: (monthNum: number) => void;
};

const YearSelect: React.FC<Props> = ({ year, onSelect }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(parseInt(e.target.value, 10));
  };
  return (
    <div className="flex items-center w-full max-w-[10rem]">
      <Select value={year} onChange={handleChange} className="w-full">
        {YEARS.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default YearSelect;
