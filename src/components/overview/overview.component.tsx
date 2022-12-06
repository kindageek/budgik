import React from "react";

import OverviewHeader from "./overview-header.component";
import PageContainer from "../page-container/page-container.component";
import OverviewSummary from "./overview-summary/overview-summary.component";

const Overview: React.FC = () => {
  return (
    <PageContainer>
      <OverviewHeader />
      <OverviewSummary />
    </PageContainer>
  );
};

export default Overview;
