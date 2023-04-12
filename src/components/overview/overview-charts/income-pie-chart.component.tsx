import React from "react";
import { trpc } from "utils/trpc";
import type { ChartData } from "types";

import Card from "../../card/card.component";
import PieChart from "../../charts/pie-chart.component";
import Loader from "../../loader/loader.component";
import ChartTitle from "components/charts/chart-title.component";
import NoDataMessage from "components/no-data-message.component";

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
      <div className="flex h-full w-full flex-col">
        <ChartTitle title={`Income by categories (${monthName})`} />
        {isLoading ? (
          <Loader />
        ) : data.length ? (
          <PieChart data={data} />
        ) : (
          <NoDataMessage />
        )}
      </div>
    </Card>
  );
};

export default IncomePieChart;
