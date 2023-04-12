import React from "react";
import {
  Cell,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
  type TooltipProps,
} from "recharts";
import type { ChartData } from "types";
import { COLORS, numWithCommas } from "utils";

type Props = {
  data: ChartData[];
};

const TooltipContent = (data: TooltipProps<number, string>) => {
  const { active, payload } = data;
  if (active && payload && payload.length) {
    return (
      <div className="flex rounded-lg border bg-white p-2.5 text-xs shadow-md">
        <p className="mr-1">{payload[0]?.name}:</p>
        <p className="">${numWithCommas(payload[0]?.value || 0)}</p>
      </div>
    );
  }

  return null;
};

const PieChart: React.FC<Props> = ({ data }) => {
  const renderLabel = (values: ChartData) => {
    const { name, value } = values;
    return `${name} ($${numWithCommas(value)})`;
  };

  const colors = COLORS[0] || [];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsPieChart height={400}>
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
