import React from "react";
import Sidebar from "../sidebar/sidebar.component";
import styles from "./dashboard-layout.module.css";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <main
      className={`${styles.dashboardLayout} flex h-full w-screen flex-row justify-start`}
    >
      <Sidebar />
      {children}
    </main>
  );
};

export default DashboardLayout;
