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

const CategoryTabs: React.FC = () => {
  return (
    <div className="mb-4 w-full">
      <Tabs tabs={tabs} />
    </div>
  );
};

export default CategoryTabs;
