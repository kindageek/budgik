import { useRouter } from 'next/router';
import React from "react";
import { AiFillGithub } from "react-icons/ai";
import { MdOutlineEmail } from "react-icons/md";

const Footer: React.FC = () => {
  const router = useRouter();
  const isHomePage = router.pathname === "/";
  return (
    <footer className={`container mx-auto flex w-full items-center justify-between gap-2 px-4 py-2 sm:px-4 sm:py-3 ${isHomePage ? 'text-white' : 'text-black'}`}>
      <ul className="flex items-center gap-4">
        <li className="flex items-center justify-center">
          <a href="mailto:nsanzhar.99@gmail.com" title="Email">
            <MdOutlineEmail size={24} />
          </a>
        </li>
        <li className="flex items-center justify-center">
          <a
            href="https://github.com/kindageek/budgik"
            target="_blank"
            rel="noreferrer"
            title="Source code"
          >
            <AiFillGithub size={24} />
          </a>
        </li>
      </ul>
      <div className="flex items-center gap-2">
        <p className="text-xs">Copyright © 2022 Budgik.</p>
        <p className="text-xs">All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
