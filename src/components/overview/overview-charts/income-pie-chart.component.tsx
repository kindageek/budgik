import React from "react";
import { trpc } from "../../../utils/trpc";
import type { ChartData } from "../../../types/types";

import Card from "../../card/card.component";
import PieChart from "./pie-chart.component";
import Loader from "../../loader/loader.component";
import OverviewChartTitle from "./overview-chart-title.component";

const getMonthAndYear = (date: Date) => {
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${month}-${year}`;
};

const isCurrentMonth = (date: Date) => {
  return getMonthAndYear(date) === getMonthAndYear(new Date());
};

const IncomePieChart: React.FC = () => {
  const monthName = new Date().toLocaleString("default", { month: "long" });

  const { data: categories, isLoading } =
    trpc.category.getIncomeCategories.useQuery({
      includeIncomeData: true,
    });

  const data: ChartData[] =
    categories && categories?.length > 0
      ? categories
          .map((c) => ({
            name: c.name,
            value: c.incomes
              .filter((e) => isCurrentMonth(e.date))
              .reduce((sum, e) => sum + e.value, 0),
          }))
          .filter(({ value }) => value !== 0)
      : [];

  return (
    <Card>
      <div className="flex h-full w-full cursor-pointer flex-col">
        <OverviewChartTitle title={`Income by categories (${monthName})`} />
        {isLoading ? <Loader /> : <PieChart data={data} />}
      </div>
    </Card>
  );
};

export default IncomePieChart;
