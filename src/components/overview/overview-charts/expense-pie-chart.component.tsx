import React from "react";
import { trpc } from "../../../utils/trpc";
import type { PieChartData } from "../../../types/types";

import Card from "../../card/card.component";
import PieChart from "./pie-chart.component";

const getMonthAndYear = (date: Date) => {
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${month}-${year}`;
};

const isCurrentMonth = (date: Date) => {
  return getMonthAndYear(date) === getMonthAndYear(new Date());
};

const ExpensePieChart: React.FC = () => {
  const monthName = new Date().toLocaleString("default", { month: "long" });

  const { data: categories } = trpc.category.getExpenseCategories.useQuery({
    includeExpenseData: true,
  });

  const data: PieChartData[] =
    categories && categories?.length > 0
      ? categories
          .map((c) => ({
            name: c.name,
            value: c.expenses
              .filter((e) => isCurrentMonth(e.date))
              .reduce((sum, e) => sum + e.value, 0),
          }))
          .filter(({ value }) => value !== 0)
      : [];

  return (
    <Card>
      <div className="flex h-full w-full cursor-pointer flex-col">
        <h3 className="mb-4 text-xl font-medium text-gray-700">
          Expenses by categories ({monthName})
        </h3>
        <PieChart data={data} />
      </div>
    </Card>
  );
};

export default ExpensePieChart;
