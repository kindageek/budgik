import React from "react";
import {
  Cell,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { ChartData } from "../../../types/types";
import { numWithCommas } from "../../../utils/shared";

type Props = {
  data: ChartData[];
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

const TooltipContent = (data: any) => {
  const { active, payload } = data;
  if (active && payload && payload.length) {
    return (
      <div className="flex rounded-lg border bg-white p-2.5 text-xs shadow-md">
        <p className="mr-1">{payload[0].name}:</p>
        <p className="">${numWithCommas(payload[0].value)}</p>
      </div>
    );
  }

  return null;
};

const PieChart: React.FC<Props> = ({ data }) => {
  const renderLabel = (values: any) => {
    const { name, value } = values;
    return `${name} ($${numWithCommas(value)})`;
  };

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
        <Tooltip content={<TooltipContent />} />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};

export default PieChart;
