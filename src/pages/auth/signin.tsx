import React from "react";
import { type NextPage } from "next";
import Head from "next/head";
import SignInForm from "../../components/auth/sign-in/sign-in-form.component";

const SignIn: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sign in | Budgik</title>
        <meta name="description" content="Budget planner | Money tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen w-screen flex-col items-center justify-center px-4">
        <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_0%,#000_20%,#313E8B_100%)]"></div>
        <SignInForm />
      </main>
    </>
  );
};

export default SignIn;
