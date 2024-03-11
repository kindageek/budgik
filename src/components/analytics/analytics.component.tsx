import React, { useState } from "react";

import PageContainer from "../page-container/page-container.component";
import PageHeader from "../page-header/page-header.component";
import AnalyticsSummary from "./analytics-summary";
import YearSelect from "components/table-filters/year-select.component";
import MonthSelect from "components/table-filters/month-select.component";
import AnalyticsCharts from "./analytics-charts";
import { trpc } from "utils";
import IconBtn from "components/form/icon-btn";

const Analytics: React.FC = () => {
  const { data: years } = trpc.user.getYears.useQuery();

  const [filters, setFilters] = useState<{ month: number; year: number }>({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  const handleNextMonth = () => {
    if (filters.month === 12) {
      if (!(years || []).includes(filters.year + 1)) {
        return;
      }
      setFilters({
        month: 1,
        year: filters.year + 1,
      });
      return;
    }
    setFilters({
      ...filters,
      month: filters.month + 1,
    });
  };

  const handlePrevMonth = () => {
    if (filters.month === 1) {
      if (!(years || []).includes(filters.year - 1)) {
        return;
      }
      setFilters({
        month: 12,
        year: filters.year - 1,
      });
      return;
    }
    setFilters({
      ...filters,
      month: filters.month - 1,
    });
  };

  const setYear = (year: number) => {
    setFilters({
      ...filters,
      year,
    });
  };

  const setMonth = (month: number) => {
    setFilters({
      ...filters,
      month,
    });
  };

  return (
    <PageContainer>
      <div className="grid h-full w-full grid-cols-1 gap-5 sm:gap-10">
        <PageHeader title="Analytics" noMargin />
        <div className="flex w-full items-center justify-start gap-2">
          <IconBtn
            icon="prev"
            onClick={() => handlePrevMonth()}
            disabled={
              filters.month === 1 && !(years || []).includes(filters.year - 1)
            }
          />
          <YearSelect year={filters.year} onSelect={setYear} />
          <MonthSelect month={filters.month} onSelect={setMonth} />
          <IconBtn
            icon="next"
            onClick={() => handleNextMonth()}
            disabled={
              filters.month === 12 && !(years || []).includes(filters.year + 1)
            }
          />
        </div>
        <AnalyticsSummary filters={filters} />
        <AnalyticsCharts filters={filters} />
      </div>
    </PageContainer>
  );
};

export default Analytics;
