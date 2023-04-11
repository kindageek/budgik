import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { AiFillHome } from "react-icons/ai";
import { FaMoneyBillAlt, FaAngleDoubleRight } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import { BiCategoryAlt } from "react-icons/bi";

import useBoolean from "hooks/useBoolean";
import type { NestedLink } from '../../types/types';

export const DASHBOARD_NAV_LINKS: NestedLink[] = [
  {
    title: "Overview",
    url: "/dashboard",
    icon: <AiFillHome />,
  },
  {
    title: "Expenses",
    url: "/dashboard/expenses",
    icon: <FaMoneyBillAlt />,
  },
  {
    title: "Income",
    url: "/dashboard/income",
    icon: <GiTakeMyMoney />,
  },
  {
    title: "Categories",
    url: "/dashboard/category?tab=EXPENSE",
    icon: <BiCategoryAlt />,
  },
];

const Sidebar: React.FC = () => {
  const router = useRouter();
  const {
    value: isExpanded,
    toggle,
    setValue: setIsExpanded,
  } = useBoolean(false);

  const {
    value: isMouseInside,
    setTrue: mouseInside,
    setFalse: mouseOutside,
  } = useBoolean(false);

  const toggleSidebar = () => {
    toggle();
    localStorage.setItem("sidebar-expanded", isExpanded ? "false" : "true");
  };

  useEffect(() => {
    const storageToggleValue =
      localStorage?.getItem("sidebar-expanded") || "true";
    setIsExpanded(storageToggleValue === "true");
  }, [setIsExpanded]);

  return (
    <aside
      className={`sticky left-0 top-[56px] flex h-[calc(100vh_-_56px)] self-start max-sm:hidden`}
      aria-label="sidebar"
      onMouseEnter={mouseInside}
      onMouseLeave={mouseOutside}
    >
      <div
        className={`${
          isExpanded ? "w-64" : "w-20"
        } flex h-full flex-col overflow-y-auto rounded bg-gray-50 py-4 px-3 transition-all duration-300 dark:bg-gray-800`}
      >
        <div className="flex items-center justify-between px-2 py-4">
          {isExpanded && <h3 className="text-2xl font-bold">Dashboard</h3>}
          <div
            className={`flex cursor-pointer items-center justify-center rounded-lg p-2 hover:bg-gray-200 ${
              !isExpanded || isMouseInside ? "opacity-100" : "opacity-0"
            }  transition-all duration-300`}
            onClick={toggleSidebar}
            title="Toggle sidebar"
          >
            <FaAngleDoubleRight
              size={20}
              className={` transition-all duration-300 ${
                isExpanded && "rotate-180"
              }`}
            />
          </div>
        </div>
        <ul className="h-full space-y-2">
          {DASHBOARD_NAV_LINKS.map(({ title, url, icon }, index) => (
            <li key={index} title={title}>
              <Link
                href={url}
                className={`justify-left flex items-center rounded-lg py-3 px-2 text-lg font-normal text-gray-900 hover:bg-gray-200 ${
                  router.pathname === url.split("?")[0]
                    ? "bg-gray-200"
                    : "bg-transparent"
                }`}
              >
                <span className="flex items-center justify-center p-2">
                  {icon}
                </span>
                {isExpanded && <span className="ml-3">{title}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
