import React from "react";
import type { ChartData } from "types";

import Card from "../../card/card.component";
import PieChart from "../../charts/pie-chart.component";
import Loader from "../../loader/loader.component";
import ChartTitle from "../../charts/chart-title.component";
import NoDataMessage from 'components/no-data-message.component';

type Props = {
  data: ChartData[];
  monthName: string;
  isLoading: boolean;
  title: "Expenses" | "Income";
};

const AnalyticsPieChart: React.FC<Props> = ({
  data,
  monthName,
  isLoading,
  title,
}) => {
  return (
    <Card>
      <div className="flex h-full w-full flex-col">
        <ChartTitle title={`${title} by categories (${monthName})`} />
        {isLoading ? (
          <Loader />
        ) : data.length === 0 ? (
          <NoDataMessage />
        ) : (
          <PieChart data={data} />
        )}
      </div>
    </Card>
  );
};

export default AnalyticsPieChart;
