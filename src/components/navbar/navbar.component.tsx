import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import useBoolean from "../../hooks/useBoolean";
import NavLink from "./nav-link.component";
import UserNavProfile from "./user-nav-profile.component";

const Navbar: React.FC = () => {
  const router = useRouter();
  const { status } = useSession();
  const { value: navOpen, toggle: toggleNav } = useBoolean(false); // TODO: mobile version

  return (
    <nav className="w-full border-gray-200 bg-indigo-700 px-2 py-2.5 sm:px-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <Link href="/" className="flex items-center">
          <img
            src="/assets/images/budgik-logo.png"
            className="mr-3 h-6 sm:h-9"
            alt="Budgik Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
            Budgik
          </span>
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-400 hover:bg-secondary hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-600 md:hidden"
          aria-controls="navbar-default"
          aria-expanded="false"
          onClick={toggleNav}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="h-6 w-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div
          className={`${
            navOpen ? "block" : "hidden"
          } w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="mt-4 flex flex-col rounded-lg border border-accent bg-indigo-700 px-4 py-2 md:mt-0 md:flex-row md:items-center md:space-x-8 md:border-0 md:text-sm md:font-medium">
            {status === "authenticated" ? (
              <>
                <li>
                  <NavLink
                    text="Home"
                    url="/"
                    isActive={router.pathname === "/"}
                  />
                </li>
                <li>
                  <NavLink
                    text="Dashboard"
                    url="/dashboard"
                    isActive={router.pathname === "/dashboard"}
                  />
                </li>
                <li>
                  <UserNavProfile />
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    text="Home"
                    url="/"
                    isActive={router.pathname === "/"}
                  />
                </li>
                <li>
                  <NavLink
                    text="Sign in"
                    url="/api/auth/signin"
                    isActive={router.pathname === "/api/auth/signin"}
                  />
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
