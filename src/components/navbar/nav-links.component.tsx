import React from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

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

  return (
    <ul className="flex flex-col-reverse bg-primary-default px-4 py-4 shadow-md sm:bg-transparent md:mt-0 md:flex-row md:items-center md:space-x-8 md:border-0 md:py-0 md:text-sm md:font-medium md:shadow-none">
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
            <NavLink text="Sign in" url="/api/auth/signin" />
          </li>
        </>
      )}
    </ul>
  );
};

export default NavLinks;
