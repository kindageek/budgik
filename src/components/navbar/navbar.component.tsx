import React from "react";

import useBoolean from "hooks/useBoolean";

import NavLinks from "./nav-links.component";
import NavbarLogo from "./navbar-logo.component";
import NavbarHamburger from "./navbar-hamburger.component";
import { useRouter } from "next/router";

const Navbar: React.FC = () => {
  const { value: navOpen, toggle: toggleNav } = useBoolean(false); // TODO: mobile version
  const router = useRouter();
  const isHomePage = router.pathname === "/";

  return (
    <nav
      className={`sticky left-0 top-0 z-50 w-full border-gray-200 px-4 py-2.5 sm:px-4 ${
        isHomePage ? "bg-transparent" : "bg-primary-default"
      }`}
    >
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <NavbarLogo />
        <NavbarHamburger open={navOpen} onClick={toggleNav} />
        <div
          className={`w-full md:block md:w-auto ${
            navOpen ? "fixed left-0 top-[56px] z-50" : "hidden"
          }`}
        >
          <NavLinks />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
