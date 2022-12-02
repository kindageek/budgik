import type { NextPageContext, NextPage } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import DashboardLayout from "../../../components/dashboard-layout/dashboard-layout.component";
import Navbar from "../../../components/navbar/navbar.component";
import ExpensesTable from "../../../components/expenses/expenses-table/expenses-table.component";

const DashboardExpenses: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard | Budgik</title>
        <meta name="description" content="Budget planner | Money tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-min-screen flex w-screen flex-col items-center">
        <Navbar />
        <DashboardLayout>
          <div className="flex flex-col w-full">
            <h1 className="text-5xl font-extrabold leading-normal text-gray-700 mb-6">
              Expenses
            </h1>
            <ExpensesTable />
          </div>
        </DashboardLayout>
      </main>
    </>
  );
};

export const getServerSideProps = async (context: NextPageContext) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: { destination: "/auth/signin" },
    };
  }
  return { props: {} };
};

export default DashboardExpenses;
