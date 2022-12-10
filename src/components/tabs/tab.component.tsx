import Link from "next/link";
import React from "react";
import type { Tab as ITab } from "../../types/types";

type Props = {
  tab: ITab;
  active: boolean;
};

const Tab: React.FC<Props> = ({ tab: { title, href }, active }) => {
  return (
    <li>
      <Link
        href={href}
        className={`inline-block rounded-t-lg border-b-2 p-4 ${
          active
            ? "active border-primary-default text-primary-default"
            : "border-transparent hover:border-gray-300 hover:text-gray-600"
        }`}
      >
        {title}
      </Link>
    </li>
  );
};

export default Tab;
