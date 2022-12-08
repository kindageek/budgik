import React from "react";
import ExpenseBarChart from "./income-bar-chart.component";
import ExpensePieChart from "./expense-pie-chart.component";
import IncomePieChart from "./income-pie-chart.component";
import IncomeBarChart from "./income-bar-chart.component";

const OverviewCharts: React.FC = () => {
  return (
    <div className="grid w-full grid-cols-2 grid-rows-[repeat(2,400px)] gap-10 max-lg:grid-cols-1">
      <ExpensePieChart />
      <ExpenseBarChart />
      <IncomePieChart />
      <IncomeBarChart />
    </div>
  );
};

export default OverviewCharts;
