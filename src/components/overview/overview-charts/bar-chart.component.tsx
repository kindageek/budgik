import React from "react";
import {
  Cell,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  Bar,
  YAxis,
  XAxis,
} from "recharts";
import type { ChartData } from "../../../types/types";
import { COLORS } from '../../../utils/constants';
import { numWithCommas } from "../../../utils/shared";

type Props = {
  data: ChartData[];
};

const BarChart: React.FC<Props> = ({ data }) => {
  const colors = COLORS[1] || [];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart data={data} height={400}>
        <XAxis dataKey="name" />
        <YAxis tickFormatter={(value: number) => `$${numWithCommas(value)}`} />
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
