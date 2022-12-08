import React from "react";
import ExpensePieChart from "./expense-pie-chart.component";

const OverviewCharts: React.FC = () => {
  return (
    <div className="grid w-full grid-cols-2 gap-10 max-lg:grid-cols-1">
      <ExpensePieChart />
    </div>
  );
};

export default OverviewCharts;
