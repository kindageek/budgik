import React, { useCallback, useMemo } from "react";
import type { ChartData } from "types";
import { trpc } from "utils";
import AnalyticsPieChart from "./analytics-pie-chart.component";
import CategoriesByMonth from "./by-month/categories-by-month.component";

type Props = {
  monthIdx: number;
  year: number;
};

const AnalyticsCharts: React.FC<Props> = ({ monthIdx, year }) => {
  const { data: expenseCategories, isLoading: isExpenseCategoriesLoading } =
    trpc.category.getExpenseCategories.useQuery({
      includeExpenseData: true,
    });

  const { data: incomeCategories, isLoading: isIncomeCategoriesLoading } =
    trpc.category.getIncomeCategories.useQuery({
      includeIncomeData: true,
    });

  const monthName = useMemo(() => {
    return new Date(new Date().setMonth(monthIdx - 1)).toLocaleString(
      "default",
      { month: "long" }
    );
  }, [monthIdx]);

  const isCorrectDate = useCallback(
    (date: Date) => {
      const _month = date.getMonth() + 1;
      const _year = date.getFullYear();
      return _month === monthIdx && _year === year;
    },
    [monthIdx, year]
  );

  const expensesCategoriesData: ChartData[] = useMemo(() => {
    if (!expenseCategories || !expenseCategories?.length) return [];
    return expenseCategories
      .map((c) => ({
        name: c.name,
        value: c.expenses
          .filter((e) => isCorrectDate(e.date))
          .reduce((sum, e) => sum + e.value, 0),
      }))
      .filter(({ value }) => value !== 0)
      .map((item: ChartData) => ({
        ...item,
        value: Number(item.value.toFixed(2)),
      }));
  }, [expenseCategories, isCorrectDate]);

  const incomeCategoriesData: ChartData[] = useMemo(() => {
    if (!incomeCategories || !incomeCategories?.length) return [];
    return incomeCategories
      .map((c) => ({
        name: c.name,
        value: c.incomes
          .filter((e) => isCorrectDate(e.date))
          .reduce((sum, e) => sum + e.value, 0),
      }))
      .filter(({ value }) => value !== 0)
      .map((item: ChartData) => ({
        ...item,
        value: Number(item.value.toFixed(2)),
      }));
  }, [incomeCategories, isCorrectDate]);

  return (
    <div className="grid w-full grid-cols-1 grid-rows-[repeat(2,400px)] gap-5 sm:gap-10 md:grid-cols-2">
      <AnalyticsPieChart
        data={expensesCategoriesData}
        monthName={monthName}
        isLoading={isExpenseCategoriesLoading}
        title="Expenses"
      />
      <AnalyticsPieChart
        data={incomeCategoriesData}
        monthName={monthName}
        isLoading={isIncomeCategoriesLoading}
        title="Income"
      />
      <CategoriesByMonth data={expenseCategories} year={year} variant="EXPENSE" />
      <CategoriesByMonth data={incomeCategories} year={year} variant="INCOME"/>
    </div>
  );
};

export default AnalyticsCharts;
