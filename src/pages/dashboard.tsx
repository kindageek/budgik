import type { NextPageContext, NextPage } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Navbar from "../components/navbar/navbar.component";

const Dashboard: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard | Budgik</title>
        <meta name="description" content="Budget planner | Money tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-min-screen flex w-screen flex-col items-center">
        <Navbar />
        <h1 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem]">
          Hello Dashboard!
        </h1>
      </main>
    </>
  );
};

export const getServerSideProps = async (context: NextPageContext) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: { destination: "/api/auth/signin" },
    };
  }
  return { props: {} };
};

export default Dashboard;
