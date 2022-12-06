import React from "react";
import { getAllExpenses } from "../../../services/expenses";
import { getAllIncomes } from "../../../services/income";
import { numWithCommas } from "../../../utils/shared";
import OverviewSummaryItem from "./overview-summary-item.component";

const sum = (arr?: number[]) => {
  return arr ? arr.reduce((sum, value) => sum + value, 0) : 0;
};

const OverviewSummary: React.FC = () => {
  const month = new Date().getMonth() + 1;
  const monthName = new Date().toLocaleString("default", { month: "long" });
  const year = new Date().getFullYear();

  const { data: allncome } = getAllIncomes();
  const { data: allExpenses } = getAllExpenses();

  const { data: monthIncomes } = getAllIncomes(month, year);
  const { data: monthExpenses } = getAllExpenses(month, year);

  const totalIncome = sum(allncome?.map((i) => i.value));
  const totalExpenses = sum(allExpenses?.map((e) => e.value));

  const totalMonthExpenses = sum(monthExpenses?.map((e) => e.value));
  const totalMonthIncome = sum(monthIncomes?.map((i) => i.value));

  return (
    <div className="grid w-full grid-cols-4 gap-10 max-lg:grid-cols-2">
      <OverviewSummaryItem
        title={`Total Spent (${monthName})`}
        value={`$${numWithCommas(totalMonthExpenses)}`}
      />
      <OverviewSummaryItem
        title={`Total Spent (${year})`}
        value={`$${numWithCommas(totalExpenses)}`}
      />
      <OverviewSummaryItem
        title={`Total Income (${monthName})`}
        value={`$${numWithCommas(totalMonthIncome)}`}
      />
      <OverviewSummaryItem
        title={`Total Income (${year})`}
        value={`$${numWithCommas(totalIncome)}`}
      />
    </div>
  );
};

export default OverviewSummary;
