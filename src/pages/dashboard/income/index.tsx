import type { NextPageContext, NextPage } from "next";
import { getSession } from "next-auth/react";
import Income from "../../../components/income/income.component";
import Layout from "../../../components/layout/layout.component";

const DashboardIncome: NextPage = () => {
  return (
    <Layout>
      <Income />
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

export default DashboardIncome;
