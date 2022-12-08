import React from "react";

import { MONTHS } from "../../../utils/constants";
import type { PieChartData } from "../../../types/types";
import { getAllExpenses } from "../../../services/expenses";

import Card from "../../card/card.component";
import BarChart from './bar-chart.component';

const ExpenseBarChart: React.FC = () => {
  const year = new Date().getFullYear();
  const currMonth = new Date().getMonth() + 1;
  const prevMonth = currMonth === 1 ? 12 : currMonth - 1;
  const prevPrevMonth = prevMonth === 1 ? 12 : prevMonth - 1;

  const { data: expenses1 } = getAllExpenses(currMonth, year);
  const { data: expenses2 } = getAllExpenses(
    prevMonth,
    prevMonth <= 12 ? year - 1 : year
  );
  const { data: expenses3 } = getAllExpenses(
    prevPrevMonth,
    prevPrevMonth <= 12 ? year - 1 : year
  );

  const data: PieChartData[] = [
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
      <div className="flex h-full w-full cursor-pointer flex-col">
        <h3 className="mb-4 text-xl font-medium text-gray-700">
          Expenses in the last 3 months
        </h3>
      <BarChart data={data} />
      </div>
    </Card>
  );
};

export default ExpenseBarChart;
