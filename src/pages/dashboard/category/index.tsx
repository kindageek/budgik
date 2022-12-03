import type { NextPageContext, NextPage } from "next";
import { getSession } from "next-auth/react";
import Layout from "../../../components/layout/layout.component";
import Category from "../../../components/category/category.component";

const DashboardCategory: NextPage = () => {
  return (
    <Layout>
      <Category />
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

export default DashboardCategory;
