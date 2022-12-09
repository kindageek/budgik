import React from "react";
import useMediaQuery from "../../hooks/useMediaQuery";
import { MONTHS } from "../../utils/constants";
import Dropdown from "../dropdown/dropdown.component";

type Props = {
  month: number;
  onSelect: (monthNum: number) => void;
};

const MonthSelect: React.FC<Props> = ({ month, onSelect }) => {
  const isMediumScreen = useMediaQuery("(max-width: 768px)");
  console.log('isMediumScreen:', isMediumScreen)
  const trimValue = (val: string) => (isMediumScreen ? val.slice(0, 3) : val);
  
  const handleMonthChange = (month: string) => {
    onSelect(MONTHS.indexOf(month) + 1);
  };

  return (
    <div className="flex w-full max-w-[12rem] items-center">
      <Dropdown
        value={MONTHS[month - 1] || ""}
        values={MONTHS}
        formatter={trimValue}
        onChange={handleMonthChange}
        fullWidth
      />
    </div>
  );
};

export default MonthSelect;
