import { useRouter } from "next/router";
import React from "react";
import type { Tab as ITab } from "../../types/types";
import Tab from "./tab.component";

type Props = {
  tabs: ITab[];
};

const Tabs: React.FC<Props> = ({ tabs }) => {
  const router = useRouter();
  const activePath = router.asPath;

  return (
    <div className="border-b border-gray-200 text-center text-sm font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400">
      <ul className="-mb-px flex flex-wrap gap-2">
        {tabs.map((tab, index) => (
          <Tab tab={tab} key={index} active={tab.href === activePath} />
        ))}
      </ul>
    </div>
  );
};

export default Tabs;
