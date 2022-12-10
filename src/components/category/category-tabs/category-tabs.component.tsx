import React from "react";
import type { Tab } from "../../../types/types";
import Tabs from "../../tabs/tabs.component";

const tabs: Tab[] = [
  {
    title: "Expense",
    href: "/dashboard/category?tab=EXPENSE",
  },
  {
    title: "Income",
    href: "/dashboard/category?tab=INCOME",
  },
];

type Props = {
  tab: 'EXPENSE' | 'INCOME';
}

const CategoryTabs: React.FC<Props> = ({ tab }) => {
  return (
    <div className="mb-4 w-full">
      <Tabs tabs={tabs} activeTab={tab} />
    </div>
  );
};

export default CategoryTabs;
