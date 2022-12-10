import Link from "next/link";
import React from "react";

const HomeHero: React.FC = () => {
  return (
    <div className="flex h-full w-full flex-1 flex-col items-center justify-center">
      <h1 className="mb-4 text-center text-5xl font-extrabold leading-normal text-gray-700">
        Welcome to <span className="text-secondary">Budgik!</span>
      </h1>
      <h3 className="mb-4 text-center text-xl font-normal leading-normal text-gray-700">
        Track your expenses, incomes and plan your budget easily.
      </h3>
      <Link
        href="/dashboard"
        className="btn mt-4 rounded-lg bg-secondary-default px-4 py-2 text-white hover:bg-secondary-dark"
      >
        Start budgeting
      </Link>
    </div>
  );
};

export default HomeHero;
