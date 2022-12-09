import { useRouter } from "next/router";
import React from "react";
import Footer from '../footer/footer.component';
import Sidebar from "../sidebar/sidebar.component";
import styles from "./dashboard-layout.module.css";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const isDashboardOverview = router.pathname === "/dashboard";
  return (
    <div
      className={`${
        isDashboardOverview
          ? styles.dashboardLayout
          : styles.dashboardLayoutNoScroll
      } flex w-screen`}
    >
      <Sidebar />
      <div
        className={`${styles.content} ${
          isDashboardOverview ? "" : styles.overflowHidden
        } h-full w-full flex flex-col justify-between`}
      >
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
