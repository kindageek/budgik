import React from "react";

type Props = {
  title: string;
  noMargin?: boolean;
};
const ChartTitle: React.FC<Props> = ({ title, noMargin = false }) => {
  return (
    <h3
      className={`${
        noMargin ? "" : "mb-2 md:mb-4 sm:mb-4"
      } w-full text-lg font-medium text-gray-700 sm:text-xl`}
    >
      {title}
    </h3>
  );
};

export default ChartTitle;
