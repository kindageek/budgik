import React from "react";
import {
  Cell,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  Bar,
  YAxis,
  XAxis,
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
        <p className="mr-1">{payload[0]?.payload.name}:</p>
        <p className="">${numWithCommas(payload[0]?.payload.value)}</p>
      </div>
    );
  }

  return null;
};

const BarChart: React.FC<Props> = ({ data }) => {
  const colors = COLORS[1] || [];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart
        data={data}
        height={400}
        margin={{
          left: 35,
        }}
      >
        <XAxis dataKey="name" />
        <YAxis
          tickFormatter={(value: number) => `$${numWithCommas(value)}`}
          // type="number"
          // domain={[0, Math.max(...data.map((r: ChartData) => r.value))]}
        />
        <Bar dataKey="value" fill="#8884d8">
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Bar>
        <Tooltip
          wrapperStyle={{ outline: "none" }}
          content={<TooltipContent />}
          cursor={{ fill: "transparent" }}
        />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

export default BarChart;
