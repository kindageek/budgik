import React from "react";
import Sidebar from "../sidebar/sidebar.component";
import styles from "./dashboard-layout.module.css";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <main
      className={`${styles.dashboardLayout} flex w-screen flex-row justify-start`}
    >
      <Sidebar />
      <div className={`${styles.dashboardLayout} h-full w-full`}>
        {children}
      </div>
    </main>
  );
};

export default DashboardLayout;
