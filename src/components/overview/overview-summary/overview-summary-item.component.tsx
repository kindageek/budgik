import React from "react";
import Card from "../../card/card.component";
import Loader from "../../loader/loader.component";

type Props = {
  loading: boolean;
  title: string;
  value: string;
  icon: React.ReactNode;
};

const OverviewSummaryItem: React.FC<Props> = ({
  loading,
  title,
  value,
  icon,
}) => {
  return (
    <Card>
      <div className="flex h-full w-full flex-col justify-between">
        <div className="mb-2 flex w-full items-start justify-between sm:mb-4">
          <h3 className="mb-2 text-lg font-medium text-gray-700 sm:mb-4 sm:text-xl">
            {title}
          </h3>
          {icon}
        </div>
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
