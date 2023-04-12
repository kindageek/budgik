import React from "react";
import { getAllExpenses } from "services/expenses";
import { getAllIncomes } from "services/income";
import { numWithCommas } from "utils";
import AnalyticsSummaryItem from "./analytics-summary-item.component";
import { GrMoney } from "react-icons/gr";
import { FaMoneyBillWave } from "react-icons/fa";

const sum = (arr?: number[]) => {
  return arr ? arr.reduce((sum, value) => sum + value, 0) : 0;
};

type Props = {
  monthIdx: number;
  year: number;
};

const AnalyticsSummary: React.FC<Props> = ({ monthIdx, year }) => {
  const { data: monthIncomes, isLoading: monthIncomeLoading } = getAllIncomes(
    monthIdx,
    year
  );
  const { data: monthExpenses, isLoading: monthExpenseLoading } =
    getAllExpenses(monthIdx, year);

  const totalMonthExpenses = sum(monthExpenses?.map((e) => e.value));
  const totalMonthIncome = sum(monthIncomes?.map((i) => i.value));

  return (
    <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 sm:gap-10">
      <AnalyticsSummaryItem
        loading={monthExpenseLoading}
        title="Total Spent"
        value={`$${numWithCommas(totalMonthExpenses)}`}
        icon={<FaMoneyBillWave size={24} />}
      />
      <AnalyticsSummaryItem
        loading={monthIncomeLoading}
        title="Total Income"
        value={`$${numWithCommas(totalMonthIncome)}`}
        icon={<GrMoney size={24} />}
      />
    </div>
  );
};

export default AnalyticsSummary;
