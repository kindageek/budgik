import { type NextPage } from "next";
import Head from "next/head";
import Footer from "components/footer/footer.component";
import HomeHero from "components/home/home-hero.component";
import Navbar from "components/navbar/navbar.component";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Budgik</title>
        <meta name="description" content="Budget planner | Money tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen w-screen flex-col items-center">
        <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_0%,#000_20%,#313E8B_100%)]"></div>
        <Navbar />
        <HomeHero />
        <Footer />
      </main>
    </>
  );
};

export default Home;
