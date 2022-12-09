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
      <div className="h-full w-full flex flex-col justify-between">
        <h3 className="mb-2 text-lg font-medium text-gray-700 sm:mb-4 sm:text-xl">
          {title}
        </h3>
        {loading ? (
          <Loader />
        ) : (
          <h3 className="text-2xl font-bold text-black sm:text-3xl">{value}</h3>
        )}
      </div>
    </Card>
  );
};

export default OverviewSummaryItem;
