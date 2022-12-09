import React from "react";
import PageHeader from "../page-header/page-header.component";

const OverviewHeader: React.FC = () => {
  const month = new Date().toLocaleString("default", { month: "long" });
  const year = new Date().getFullYear();

  return (
    <div className="flex flex-col w-full sm:items-center sm:justify-between sm:flex-row">
      <PageHeader title="Overview" noMargin />
      <h3 className="whitespace-nowrap text-xl sm:text-2xl font-medium text-gray-600">{`${month}, ${year}`}</h3>
    </div>
  );
};

export default OverviewHeader;
