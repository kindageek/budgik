import React, { useMemo, useState } from "react";
import type { Category, Expense, Income } from "@prisma/client";

import type { ChartData, MonthName } from "types";

import Card from "../../../card/card.component";
import ChartTitle from "../../../charts/chart-title.component";
import { MONTHS } from "utils/constants";
import { getMonthFromDate } from "utils/shared";
import CategorySelect from "components/table-filters/category-select.component";
import CategoriesByMonthChart from "./categories-by-month-chart.component";
import NoDataMessage from "components/no-data-message.component";

type Props = {
  year: number;
  variant: "EXPENSE" | "INCOME";
  data:
    | (Category & {
        expenses?: Expense[];
        incomes?: Income[];
      })[]
    | null
    | undefined;
};

type CategoriesData = {
  [key in MonthName]: number;
};

const CategoriesByMonth: React.FC<Props> = ({ data, year, variant }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    data && data?.length > 0 && data[0]?.name ? data[0]?.name : ""
  );

  const categoriesList = useMemo(() => {
    return Array.from(new Set(data?.map((item) => item.name))).filter(
      (c) => !!c.length
    );
  }, [data]);

  const categoryData = useMemo(() => {
    if (!selectedCategory?.length || !data) return {} as CategoriesData;
    const _categoryData =
      variant === "EXPENSE"
        ? data?.find((item) => item.name === selectedCategory)?.expenses ?? []
        : data?.find((item) => item.name === selectedCategory)?.incomes ?? [];

    const monthlyExpenseSum: CategoriesData = {
      January: 0,
      February: 0,
      March: 0,
      April: 0,
      May: 0,
      June: 0,
      July: 0,
      August: 0,
      September: 0,
      October: 0,
      November: 0,
      December: 0,
    };
    MONTHS.forEach((monthName) => {
      const _monthlyExpensesList = _categoryData.filter(
        (expense) =>
          getMonthFromDate(expense.date) === monthName &&
          expense.date.getFullYear() === year
      );
      const expenseSum = _monthlyExpensesList
        .reduce((sum, expense) => sum + expense.value, 0)
        .toFixed(2);
      monthlyExpenseSum[monthName] = Number(expenseSum);
    });
    return monthlyExpenseSum;
  }, [selectedCategory, data, year, variant]);

  const chartData = useMemo(() => {
    if (Object.values(categoryData).filter((v) => v > 0).length === 0) {
      return [];
    }
    const currentYear = new Date().getFullYear();
    const currentMonth = getMonthFromDate(new Date());
    const _chartData: ChartData[] = [];
    MONTHS.forEach((monthName) => {
      _chartData.push({
        name: monthName,
        value: categoryData[monthName],
      });
    });
    return _chartData
      .sort(
        (a, b) =>
          MONTHS.indexOf(a.name as MonthName) -
          MONTHS.indexOf(b.name as MonthName)
      )
      .filter((d) =>
        currentYear === year
          ? MONTHS.indexOf(d.name as MonthName) <=
            MONTHS.indexOf(currentMonth as MonthName)
          : true
      )
      .map((d) => ({ ...d, name: d.name.slice(0, 3) }));
  }, [categoryData, year]);

  return (
    <Card>
      <div className="flex h-full w-full flex-col">
        <div className="mb-2 flex items-center gap-4 sm:mb-4 md:mb-4">
          <ChartTitle
            title={`Expense categories by month in ${year}`}
            noMargin
          />
          <CategorySelect
            type="EXPENSE"
            category={selectedCategory}
            onSelect={setSelectedCategory}
            categories={categoriesList}
            showActive={false}
            disableAdd
          />
        </div>
        {chartData && chartData?.length > 0 ? (
          <CategoriesByMonthChart data={chartData} />
        ) : (
          <NoDataMessage />
        )}
      </div>
    </Card>
  );
};

export default CategoriesByMonth;
