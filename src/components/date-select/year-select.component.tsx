import React from "react";
import Dropdown from "../dropdown/dropdown.component";

const YEARS = [2022, 2023, 2024];

type Props = {
  year: number;
  onSelect: (monthNum: number) => void;
};

const YearSelect: React.FC<Props> = ({ year, onSelect }) => {
  const handleChange = (year: string) => {
    onSelect(parseInt(year));
  };

  return (
    <div className="flex w-full max-w-[10rem] items-center">
      <Dropdown
        value={year.toString()}
        values={YEARS.map((y) => y.toString())}
        onChange={handleChange}
        fullWidth
      />
    </div>
  );
};

export default YearSelect;
