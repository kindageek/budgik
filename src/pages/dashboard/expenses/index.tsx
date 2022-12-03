import type { NextPageContext, NextPage } from "next";
import { getSession } from "next-auth/react";
import Expenses from "../../../components/expenses/expenses.component";
import Layout from "../../../components/layout/layout.component";

const DashboardExpenses: NextPage = () => {
  return (
    <Layout>
      <Expenses />
    </Layout>
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
