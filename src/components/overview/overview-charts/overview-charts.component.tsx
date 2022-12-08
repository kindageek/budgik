import React from "react";
import ExpenseBarChart from './expense-bar-chart.component copy';
import ExpensePieChart from "./expense-pie-chart.component";

const OverviewCharts: React.FC = () => {
  return (
    <div className="grid w-full grid-cols-2 gap-10 max-lg:grid-cols-1">
      <ExpensePieChart />
      <ExpenseBarChart />
    </div>
  );
};

export default OverviewCharts;
