import React from "react";

import OverviewHeader from "./overview-header.component";
import PageContainer from "../page-container/page-container.component";
import OverviewSummary from "./overview-summary/overview-summary.component";
import OverviewCharts from "./overview-charts/overview-charts.component";

const Overview: React.FC = () => {
  return (
    <PageContainer overflow>
      <div className="grid h-full w-full grid-cols-1 gap-10">
        <OverviewHeader />
        <OverviewSummary />
        <OverviewCharts />
      </div>
    </PageContainer>
  );
};

export default Overview;
