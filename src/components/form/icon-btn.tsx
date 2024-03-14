import type { ComponentProps, FC, ReactNode } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

type IconName = "next" | "prev";

const IconMap: Record<string, ReactNode> = {
  next: <AiOutlineRight size={16} />,
  prev: <AiOutlineLeft size={16} />,
};

interface Props extends ComponentProps<"button"> {
  icon: IconName;
}

const IconBtn: FC<Props> = ({ icon, ...btnProps }) => {
  return (
    <button
      className="block cursor-pointer rounded-lg border bg-gray-50 p-2 hover:bg-gray-100 disabled:cursor-default disabled:text-gray-300 disabled:hover:bg-gray-50 dark:hover:bg-gray-600 dark:hover:text-white md:p-2.5"
      type="button"
      {...btnProps}
    >
      {IconMap[icon]}
    </button>
  );
};

export default IconBtn;
