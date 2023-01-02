import React from "react";
import { getAllExpenses } from "../../../services/expenses";
import { getAllIncomes } from "../../../services/income";
import { numWithCommas } from "../../../utils/shared";
import OverviewSummaryItem from "./overview-summary-item.component";
import { GrMoney } from "react-icons/gr";
import { FaMoneyBillWave } from "react-icons/fa";
import { BsFillPiggyBankFill } from "react-icons/bs";
import { HiCurrencyDollar } from "react-icons/hi";

const sum = (arr?: number[]) => {
  return arr ? arr.reduce((sum, value) => sum + value, 0) : 0;
};

const OverviewSummary: React.FC = () => {
  const month = new Date().getMonth() + 1;
  const monthName = new Date().toLocaleString("default", { month: "long" });
  const year = new Date().getFullYear();

  const { data: allIncome, isLoading: incomeLoading } = getAllIncomes(
    null,
    year
  );
  const { data: allExpenses, isLoading: expenseLoading } = getAllExpenses(
    null,
    year
  );

  const { data: monthIncomes, isLoading: monthIncomeLoading } = getAllIncomes(
    month,
    year
  );
  const { data: monthExpenses, isLoading: monthExpenseLoading } =
    getAllExpenses(month, year);

  const totalIncome = sum(allIncome?.map((i) => i.value));
  const totalExpenses = sum(allExpenses?.map((e) => e.value));

  const totalMonthExpenses = sum(monthExpenses?.map((e) => e.value));
  const totalMonthIncome = sum(monthIncomes?.map((i) => i.value));

  return (
    <div className="grid w-full grid-cols-4 gap-5 max-lg:grid-cols-2 sm:gap-10">
      <OverviewSummaryItem
        loading={monthExpenseLoading}
        title={`Total Spent (${monthName})`}
        value={`$${numWithCommas(totalMonthExpenses)}`}
        icon={<FaMoneyBillWave size={24} />}
      />
      <OverviewSummaryItem
        loading={expenseLoading}
        title={`Total Spent (${year})`}
        value={`$${numWithCommas(totalExpenses)}`}
        icon={<HiCurrencyDollar size={24} />}
      />
      <OverviewSummaryItem
        loading={monthIncomeLoading}
        title={`Total Income (${monthName})`}
        value={`$${numWithCommas(totalMonthIncome)}`}
        icon={<GrMoney size={24} />}
      />
      <OverviewSummaryItem
        loading={incomeLoading}
        title={`Total Income (${year})`}
        value={`$${numWithCommas(totalIncome)}`}
        icon={<BsFillPiggyBankFill size={24} />}
      />
    </div>
  );
};

export default OverviewSummary;
