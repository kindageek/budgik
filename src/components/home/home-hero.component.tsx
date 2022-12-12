import Link from "next/link";
import React from "react";

const HomeHero: React.FC = () => {
  return (
    <div className="flex h-full w-full flex-1 flex-col items-center justify-center">
      <h1 className="mb-4 text-center text-5xl font-extrabold leading-normal text-gray-100 md:text-7xl">
        Welcome to <span className="text-white">Budgik!</span>
      </h1>
      <h3 className="mb-4 text-center text-xl font-normal leading-normal text-gray-100 md:text-3xl">
        Track your expenses, income and plan your budget easily.
      </h3>
      <Link
        href="/dashboard"
        className="btn mt-4 rounded-lg border border-secondary-dark bg-secondary-default px-8 py-3 text-lg text-white shadow-lg shadow-primary-default transition-all hover:border-primary-default hover:bg-primary-light"
      >
        Start budgeting
      </Link>
    </div>
  );
};

export default HomeHero;
