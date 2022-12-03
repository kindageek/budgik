import React from "react";
import Head from "next/head";

import Navbar from "../navbar/navbar.component";
import DashboardLayout from "../dashboard-layout/dashboard-layout.component";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Dashboard | Budgik</title>
        <meta name="description" content="Budget planner | Money tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-min-screen flex w-screen flex-col items-center">
        <Navbar />
        <DashboardLayout>{children}</DashboardLayout>
      </main>
    </>
  );
};

export default Layout;
