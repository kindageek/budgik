import Link from "next/link";
import React from "react";

const HomeHero: React.FC = () => {
  return (
    <div className="flex h-full w-full flex-1 flex-col items-center justify-center">
      <h1 className="text-5xl font-extrabold leading-normal text-center text-gray-700 mb-4">
        Welcome to <span className="text-secondary">Budgik!</span>
      </h1>
      <h3 className="text-xl leading-normal text-gray-700 font-normal text-center mb-4">
        Track your expenses, incomes and plan your budget easily.
      </h3>
      <Link
        href="/dashboard"
        className="btn mt-4 rounded-lg bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600"
      >
        Start budgeting
      </Link>
    </div>
  );
};

export default HomeHero;
