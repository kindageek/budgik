import React from "react";
import { IoMdClose } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";

type Props = {
  open: boolean;
  onClick: () => void;
};

const NavbarHamburger: React.FC<Props> = ({ open, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center focus:outline-none focus:ring-0 md:hidden"
    >
      <span className="sr-only">Open main menu</span>
      {open ? (
        <IoMdClose color="white" size={16} />
      ) : (
        <GiHamburgerMenu color="white" size={16} />
      )}
    </button>
  );
};

export default NavbarHamburger;
