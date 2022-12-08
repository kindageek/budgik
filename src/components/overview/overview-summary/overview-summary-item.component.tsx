import React from "react";
import Card from "../../card/card.component";

type Props = {
  title: string;
  value: string;
};

const OverviewSummaryItem: React.FC<Props> = ({ title, value }) => {
  return (
    <Card>
      <div className="flex flex-col whitespace-normal">
        <h3 className="text-xl mb-4 font-medium text-gray-700">{title}</h3>
        <h3 className="text-3xl font-bold text-black">{value}</h3>
      </div>
    </Card>
  );
};

export default OverviewSummaryItem;
