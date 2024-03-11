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
      <main className="home-page flex h-screen w-screen flex-col items-center">
        <Navbar />
        <HomeHero />
        <Footer />
      </main>
    </>
  );
};

export default Home;
