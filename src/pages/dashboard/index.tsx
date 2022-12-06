import type { NextPageContext, NextPage } from "next";
import { getSession } from "next-auth/react";
import Layout from "../../components/layout/layout.component";
import Overview from "../../components/overview/overview.component";

const Dashboard: NextPage = () => {
  return (
    <Layout>
      <Overview />
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

export default Dashboard;
