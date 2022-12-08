import React from "react";
import PageHeader from "../page-header/page-header.component";

const OverviewHeader: React.FC = () => {
  const month = new Date().toLocaleString("default", { month: "long" });
  const year = new Date().getFullYear();

  return (
    <div className="flex w-full items-center justify-between">
      <PageHeader title="Overview" noMargin />
      <h3 className="whitespace-nowrap text-2xl font-medium text-gray-600">{`${month}, ${year}`}</h3>
    </div>
  );
};

export default OverviewHeader;
