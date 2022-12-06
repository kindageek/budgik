import React from "react";
import Dropdown from "../dropdown/dropdown.component";

type Props = {
  year: number;
  onSelect: (monthNum: number) => void;
};

const YearSelect: React.FC<Props> = ({ year, onSelect }) => {
  const currentYear = new Date().getFullYear();
  const YEARS = new Array(3).fill(0).map((_, i) => currentYear + i);
  
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
