import React, { useMemo } from "react";
import {
  Cell,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
} from "recharts";
import type { PieChartData } from "../../../types/types";
import { numWithCommas, randomIntFromInterval } from "../../../utils/shared";

type Props = {
  data: PieChartData[];
};

const COLORS: string[][] = [
  [
    "#007EC7",
    "#52BFFF",
    "#9AB6FE",
    "#8284FC",
    "#8F6BFA",
    "#A855F7",
    "#4B12F8",
    "#0407C3",
    "#012684",
    "#AF07FF",
  ],
  [
    "#C3FFCA",
    "#ACF6BF",
    "#65ECA8",
    "#1FDBAC",
    "#1DBEBE",
    "#239EC7",
    "#179292",
    "#128166",
    "#0E7240",
    "#09531C",
  ],
];

const PieChart: React.FC<Props> = ({ data }) => {
  const renderLabel = (values: any) => {
    const { name, value } = values;
    return `${name} ($${numWithCommas(value)})`;
  };

  const setIdx: number = useMemo(() => {
    return randomIntFromInterval(0, COLORS.length - 1);
  }, [data]);
  
  const colors = COLORS[0] || [];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsPieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={50}
          label={renderLabel}
          className="h-full w-full"
          fill="#8884d8"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};

export default PieChart;
