import { signOut, useSession } from "next-auth/react";
import React, { useState } from "react";
import useBoolean from "../../hooks/useBoolean";
import { FaRegUserCircle } from "react-icons/fa";
import * as Popover from "@radix-ui/react-popover";

const UserNavProfile: React.FC = () => {
  const { data: session } = useSession();
  const [imgLoaded, setImgLoaded] = useState(false);
  const { value: navOpen, toggle: toggleNav } = useBoolean(false); // TODO: mobile version

  if (!session || !session?.user) return null;

  const { user } = session;

  return (
    <div className="flex items-center py-2 pr-4 pl-3 md:order-2 md:p-0">
      <Popover.Root open={navOpen}>
        <Popover.Trigger
          onClick={toggleNav}
          className="mr-3 flex rounded-full bg-gray-800 text-sm md:mr-0"
        >
          <span className="sr-only">Open user menu</span>
          {user?.image && (
            <img
              className={`h-8 w-8 rounded-full ${imgLoaded ? "" : "hidden"}`}
              src={user?.image}
              alt="user photo"
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
            onEscapeKeyDown={toggleNav}
            onPointerDownOutside={toggleNav}
            onInteractOutside={toggleNav}
          >
            <div className="my-4 list-none divide-y divide-gray-600 bg-gray-700 text-base shadow">
              <div className="py-3 px-4">
                <span className="block text-sm text-white">{user?.name}</span>
                <span className="block truncate text-sm font-medium text-gray-400">
                  {user?.email}
                </span>
              </div>
              <ul className="py-1" aria-labelledby="user-menu-button">
                <li className="py-2 px-4">
                  <p
                    onClick={() => signOut()}
                    className="cursor-pointer text-sm text-white"
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
  );
};

export default UserNavProfile;
