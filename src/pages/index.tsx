import { type NextPage } from "next";
import Head from "next/head";
import HomeHero from '../components/home/home-hero.component';
import Navbar from '../components/navbar/navbar.component';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Budgik</title>
        <meta name="description" content="Budget planner | Money tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-screen flex flex-col items-center h-screen">
        <Navbar />
        <HomeHero />
      </main>
    </>
  );
};

export default Home;
