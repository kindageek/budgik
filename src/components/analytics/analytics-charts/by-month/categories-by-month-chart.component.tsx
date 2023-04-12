import React, { useMemo } from "react";
import {
  Cell,
  BarChart as RechartsBarChart,
  LineChart,
  ResponsiveContainer,
  Bar,
  YAxis,
  XAxis,
  Tooltip,
  Line,
  CartesianGrid,
} from "recharts";
import type { ChartData } from "types";
import { COLORS, numWithCommas } from "utils";

type Props = {
  data: ChartData[];
};

const TooltipContent = (data: any) => {
  const { active, payload } = data;
  if (active && payload && payload.length) {
    return (
      <div className="flex rounded-lg border bg-white p-2.5 text-xs shadow-md">
        <p className="mr-1">{payload[0].payload.name}:</p>
        <p className="">${numWithCommas(payload[0].payload.value)}</p>
      </div>
    );
  }

  return null;
};

const CategoriesByMonthChart: React.FC<Props> = ({ data }) => {
  const domain = useMemo(() => {
    const max =
      Math.ceil(
        (data.slice().sort((a, b) => b.value - a.value)[0]?.value || 0) / 100
      ) * 100;
    return [0, max];
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        height={400}
        margin={{
          left: 35,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" allowDataOverflow />
        <YAxis
          tickFormatter={(value: number) => `$${numWithCommas(value)}`}
          domain={domain}
        />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
        <Tooltip
          content={<TooltipContent />}
          cursor={{ fill: "transparent" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CategoriesByMonthChart;
