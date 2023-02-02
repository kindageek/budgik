import React from "react";

import { MONTHS } from "../../../utils/constants";
import type { ChartData } from "../../../types/types";
import { getAllIncomes } from "../../../services/income";

import Card from "../../card/card.component";
import BarChart from "./bar-chart.component";
import Loader from "../../loader/loader.component";
import OverviewChartTitle from "./overview-chart-title.component";

const IncomeBarChart: React.FC = () => {
  const year = new Date().getFullYear();
  const currMonth = new Date().getMonth() + 1;
  const prevMonth = currMonth === 1 ? 12 : currMonth - 1;
  const prevPrevMonth = prevMonth === 1 ? 12 : prevMonth - 1;

  const { data: expenses1, isLoading: loading1 } = getAllIncomes(
    currMonth,
    year
  );
  const { data: expenses2, isLoading: loading2 } = getAllIncomes(
    prevMonth,
    prevMonth === 12 ? year - 1 : year
  );
  const { data: expenses3, isLoading: loading3 } = getAllIncomes(
    prevPrevMonth,
    prevPrevMonth === 12 ? year - 1 : year
  );

  const data: ChartData[] = [
    {
      name: MONTHS[currMonth - 1] || currMonth.toString(),
      value: expenses1 ? expenses1?.reduce((sum, e) => sum + e.value, 0) : 0,
    },
    {
      name: MONTHS[prevMonth - 1] || prevMonth.toString(),
      value: expenses2 ? expenses2?.reduce((sum, e) => sum + e.value, 0) : 0,
    },
    {
      name: MONTHS[prevPrevMonth - 1] || prevPrevMonth.toString(),
      value: expenses3 ? expenses3?.reduce((sum, e) => sum + e.value, 0) : 0,
    },
  ];

  return (
    <Card>
      <div className="flex h-full w-full flex-col">
        <OverviewChartTitle title="Income in the last 3 months" />
        <div className="h-full w-full">
          {loading1 || loading2 || loading3 ? (
            <Loader />
          ) : (
            <BarChart data={data} />
          )}
        </div>
      </div>
    </Card>
  );
};

export default IncomeBarChart;
