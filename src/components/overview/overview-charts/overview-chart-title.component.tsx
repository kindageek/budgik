import React from "react";

type Props = {
  title: string;
};
const OverviewChartTitle: React.FC<Props> = ({ title }) => {
  return (
    <h3 className="mb-2 text-lg font-medium text-gray-700 sm:mb-4 sm:text-xl md:mb-4">
      {title}{" "}
    </h3>
  );
};

export default OverviewChartTitle;
