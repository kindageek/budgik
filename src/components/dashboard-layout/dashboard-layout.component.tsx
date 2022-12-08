import React from "react";
import Sidebar from "../sidebar/sidebar.component";
import styles from "./dashboard-layout.module.css";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div
      className={`${styles.dashboardLayout} flex w-screen`}
    >
      <Sidebar />
      <div className={`${styles.content} h-full w-full`}>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
