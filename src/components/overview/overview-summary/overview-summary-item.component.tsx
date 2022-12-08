import React from "react";
import Card from "../../card/card.component";
import Loader from "../../loader/loader.component";

type Props = {
  loading: boolean;
  title: string;
  value: string;
};

const OverviewSummaryItem: React.FC<Props> = ({ loading, title, value }) => {
  return (
    <Card>
      <div className="flex flex-col">
        <h3 className="mb-4 text-xl font-medium text-gray-700">{title}</h3>
        {loading ? (
          <Loader />
        ) : (
          <h3 className="text-3xl font-bold text-black">{value}</h3>
        )}
      </div>
    </Card>
  );
};

export default OverviewSummaryItem;
