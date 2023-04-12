import React, { useCallback, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

import PageContainer from "../page-container/page-container.component";
import PageHeader from "../page-header/page-header.component";
import AnalyticsSummary from "./analytics-summary";
import YearSelect from "components/table-filters/year-select.component";
import MonthSelect from "components/table-filters/month-select.component";
import AnalyticsCharts from "./analytics-charts";

const Analytics: React.FC = () => {
  const [monthIdx, setMonthIdx] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  const handleNextMonth = useCallback(() => {
    const prevMonth = monthIdx;
    if (prevMonth === 12) {
      setMonthIdx(1);
      setYear((v) => v + 1);
      return;
    }
    setMonthIdx((v) => v + 1);
  }, [monthIdx]);

  const handlePrevMonth = useCallback(() => {
    const prevMonth = monthIdx;
    if (prevMonth === 1) {
      setMonthIdx(12);
      setYear((v) => v - 1);
      return;
    }
    setMonthIdx((v) => v - 1);
  }, [monthIdx]);

  return (
    <PageContainer>
      <div className="grid grid-cols-1 h-full w-full gap-5 sm:gap-10">
        <PageHeader title="Analytics" noMargin/>
        <div className="flex w-full items-center justify-start gap-4">
          <button
            className="block h-full cursor-pointer rounded border bg-gray-50 py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            type="button"
            onClick={() => handlePrevMonth()}
          >
            <AiOutlineLeft />
          </button>
          <YearSelect year={year} onSelect={setYear} />
          <MonthSelect month={monthIdx} onSelect={setMonthIdx} />
          <button
            className="block h-full cursor-pointer rounded border bg-gray-50 py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            type="button"
            onClick={() => handleNextMonth()}
          >
            <AiOutlineRight />
          </button>
        </div>
        <AnalyticsSummary monthIdx={monthIdx} year={year} />
        <AnalyticsCharts monthIdx={monthIdx} year={year} />
      </div>
    </PageContainer>
  );
};

export default Analytics;
