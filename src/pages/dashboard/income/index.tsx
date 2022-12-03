import type { NextPageContext, NextPage } from "next";
import { getSession } from "next-auth/react";
import Layout from "../../../components/layout/layout.component";

const DashboardIncome: NextPage = () => {
  return (
    <Layout>
      <h1 className="mb-6 text-5xl font-extrabold leading-normal text-gray-700">
        Income
      </h1>
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
