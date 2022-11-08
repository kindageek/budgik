import Link from "next/link";
import React from "react";

type Props = {
  text: string;
  url: string;
  isActive: boolean;
};

const NavLink: React.FC<Props> = ({ text, url, isActive }) => {
  return (
    <Link
      href={url}
      className={`block rounded py-2 pr-4 pl-3 ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'} md:p-0`}
    >
      {text}
    </Link>
  );
};

export default NavLink;
