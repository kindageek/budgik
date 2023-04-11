import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { FaRegUserCircle } from "react-icons/fa";
import * as Popover from "@radix-ui/react-popover";

import useModalState from "hooks/useModalState";
import useMediaQuery from "hooks/useMediaQuery";
import NavLink from "./nav-link.component";

const UserNavProfile: React.FC = () => {
  const { data: session } = useSession();
  const [imgLoaded, setImgLoaded] = useState(false);
  const { isOpen, onToggle, onClose } = useModalState({
    initialOpen: false,
  });

  const isLargeScreen = useMediaQuery("(min-width: 768px)");

  if (!session || !session?.user) return null;

  const { user } = session;

  return (
    <>
      <div className="flex md:hidden">
        <NavLink text="Sign out" url="#" onClick={() => signOut()} />
      </div>
      <div className="hidden items-center md:order-2 md:flex md:p-0">
        <Popover.Root open={isLargeScreen && isOpen} modal>
          <Popover.Trigger
            onClick={onToggle}
            className="flex rounded-full bg-gray-800 text-sm"
          >
            <span className="sr-only">Open user menu</span>
            {user?.image && (
              <img
                className={`h-8 w-8 rounded-full ${imgLoaded ? "" : "hidden"}`}
                src={user?.image}
                alt="user"
                title={user?.name ?? ""}
                onError={() => setImgLoaded(false)}
                onLoad={() => setImgLoaded(true)}
              />
            )}
            {!user?.image ||
              (!imgLoaded && (
                <FaRegUserCircle
                  size={32}
                  color="#fff"
                  title={user?.name || ""}
                  className={`${imgLoaded ? "hidden" : ""}`}
                />
              ))}
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content
              asChild
              hideWhenDetached
              align="end"
              onEscapeKeyDown={onClose}
              onPointerDownOutside={onClose}
              onInteractOutside={onClose}
            >
              <div className="mt-4 list-none divide-y divide-gray-400 rounded-lg border bg-white text-base shadow-md focus:outline-none focus:ring-0">
                <div className="py-3 px-4">
                  <span className="text-md block font-medium text-black">
                    {user?.name}
                  </span>
                  <span className="block truncate text-sm text-gray-500">
                    {user?.email}
                  </span>
                </div>
                <ul className="py-1" aria-labelledby="user-menu-button">
                  <li className="py-2 px-4">
                    <p
                      onClick={() => signOut()}
                      className="cursor-pointer text-sm text-gray-800"
                    >
                      Sign out
                    </p>
                  </li>
                </ul>
              </div>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>
    </>
  );
};

export default UserNavProfile;
