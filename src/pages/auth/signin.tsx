import React from 'react';
import { type NextPage } from "next";
import Head from "next/head";
import SignInForm from '../../components/auth/sign-in/sign-in-form.component';

const SignIn: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sign in | Budgik</title>
        <meta name="description" content="Budget planner | Money tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-screen h-screen flex flex-col items-center justify-center bg-indigo-300 px-4">
        <SignInForm />
      </main>
    </>
  );
};

export default SignIn;
