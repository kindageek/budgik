import React from 'react';
import { type NextPage } from "next";
import Head from "next/head";
import SignUpForm from '../../components/auth/sign-up/sign-up-form.component';

const SignUp: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sign up | Budgik</title>
        <meta name="description" content="Budget planner | Money tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-screen h-screen flex flex-col items-center justify-center bg-primary-dark px-4">
        <SignUpForm />
      </main>
    </>
  );
};

export async function getStaticProps() {
  return {
    notFound: true,
  };
}


export default SignUp;
