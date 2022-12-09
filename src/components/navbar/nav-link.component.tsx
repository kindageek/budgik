import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiChevronRight } from "react-icons/fi";

import type { NestedLink } from "../../types/types";
import useModalState from "../../hooks/useModalState";

type Props = {
  text: string;
  url: string;
  isActive?: boolean;
  nestedLinks?: NestedLink[];
};

const NavLink: React.FC<Props> = ({
  text,
  url,
  isActive = false,
  nestedLinks,
}) => {
  const router = useRouter();

  const isNestedActive = nestedLinks
    ?.map((l) => l.url.split("?")[0])
    .includes(router.pathname);

  const { isOpen, onToggle } = useModalState({
    initialOpen: isNestedActive,
  });

  if (nestedLinks && nestedLinks.length > 0) {
    return (
      <>
        <div className="flex flex-col md:hidden">
          <div
            className={`flex items-center py-2 pr-4 pl-2 text-lg md:p-0 ${
              isNestedActive ? "text-white" : "text-gray-300 hover:text-white"
            }`}
            onClick={onToggle}
          >
            <FiChevronRight
              size={20}
              className={`mr-1 ${
                isOpen ? "rotate-90" : "rotate-0"
              } transition-all`}
            />
            <p>{text}</p>
          </div>
          {isOpen ? (
            <ul className="mt-2 flex flex-col pl-8">
              {nestedLinks.map(({ title, url }, index) => (
                <Link
                  key={index}
                  href={url}
                  className={`py-2 text-lg ${
                    router.pathname === url.split("?")[0]
                      ? "text-white underline underline-offset-4"
                      : "text-gray-300"
                  }`}
                >
                  {title}
                </Link>
              ))}
            </ul>
          ) : null}
        </div>
        <Link
          href={url}
          className={`block rounded py-2 pr-4 pl-3 max-md:text-lg ${
            isActive ? "text-white" : "text-gray-300 hover:text-white"
          } max-md:hidden md:p-0`}
        >
          {text}
        </Link>
      </>
    );
  }

  return (
    <Link
      href={url}
      className={`block rounded py-2 pr-4 pl-3 max-md:text-lg ${
        isActive ? "text-white" : "text-gray-300 hover:text-white"
      } md:p-0`}
    >
      {text}
    </Link>
  );
};

export default NavLink;
