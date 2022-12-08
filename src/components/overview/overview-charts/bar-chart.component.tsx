import React from "react";
import {
  Cell,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  Bar,
  YAxis,
  XAxis,
} from "recharts";
import type { PieChartData } from "../../../types/types";

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

const BarChart: React.FC<Props> = ({ data }) => {
  const colors = COLORS[1] || [];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Bar dataKey="value" fill="#8884d8">
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Bar>
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

export default BarChart;
