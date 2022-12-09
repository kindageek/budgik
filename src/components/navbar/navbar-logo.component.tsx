import React from "react";
import Link from "next/link";
import Image from "next/image";

const NavbarLogo: React.FC = () => {
  return (
    <Link href="/" className="flex items-center">
      <Image
        src="/assets/images/budgik-logo.png"
        className="mr-3 aspect-square"
        alt="Logo"
        width={36}
        height={36}
      />
      <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
        Budgik
      </span>
    </Link>
  );
};

export default NavbarLogo;
