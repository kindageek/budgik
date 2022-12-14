import React from "react";
import ExpenseBarChart from "./expense-bar-chart.component";
import ExpensePieChart from "./expense-pie-chart.component";
import IncomePieChart from "./income-pie-chart.component";
import IncomeBarChart from "./income-bar-chart.component";

const OverviewCharts: React.FC = () => {
  return (
    <div className="grid h-full w-full grid-cols-2 grid-rows-[repeat(4,400px)] gap-5 max-lg:grid-cols-1 sm:grid-rows-[repeat(2,400px)] sm:gap-10">
      <ExpensePieChart />
      <ExpenseBarChart />
      <IncomePieChart />
      <IncomeBarChart />
    </div>
  );
};

export default OverviewCharts;
