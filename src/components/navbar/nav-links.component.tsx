import React from "react";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";

import NavLink from "./nav-link.component";
import UserNavProfile from "./user-nav-profile.component";
import { DASHBOARD_NAV_LINKS } from "../sidebar/sidebar.component";

const NavLinks: React.FC = () => {
  const router = useRouter();
  const { status } = useSession();

  const isAuth = status === "authenticated";
  const isHomePage = router.pathname === "/";
  const isDahboardPages =
    router.pathname.split("/").length > 1 &&
    router.pathname.split("/")[1] === "dashboard";

  const handleGoogleAuth = () => {
    signIn("google", { callbackUrl: `${window.location.origin}/dashboard` });
  };

  return (
    <ul
      className={`flex flex-col px-4 py-4 shadow-xl sm:bg-transparent md:mt-0 md:flex-row md:items-center md:space-x-8 md:border-0 md:py-0 md:text-sm md:font-medium md:shadow-none ${
        isHomePage ? "bg-transparent" : "bg-primary-default"
      }`}
    >
      {isAuth ? (
        <>
          <li>
            <ul className="flex flex-col md:flex-row md:space-x-8">
              <li>
                <NavLink text="Home" url="/" isActive={isHomePage} />
              </li>
              <li>
                <NavLink
                  text="Dashboard"
                  url="/dashboard"
                  isActive={isDahboardPages}
                  nestedLinks={DASHBOARD_NAV_LINKS}
                />
              </li>
            </ul>
          </li>
          <li>
            <UserNavProfile />
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink text="Home" url="/" isActive={isHomePage} />
          </li>
          <li>
            <button
              className={`block rounded py-2 pl-3 pr-4 max-md:text-lg ${"text-white hover:text-white md:text-gray-300"} md:p-0`}
              onClick={handleGoogleAuth}
            >
              Sign in
            </button>
          </li>
        </>
      )}
    </ul>
  );
};

export default NavLinks;
