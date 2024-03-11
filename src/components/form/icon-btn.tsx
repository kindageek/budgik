import type { ComponentProps, FC, ReactNode } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

type IconName = "next" | "prev";

const IconMap: Record<string, ReactNode> = {
  next: <AiOutlineRight />,
  prev: <AiOutlineLeft />,
};

interface Props extends ComponentProps<"button"> {
  icon: IconName;
}

const IconBtn: FC<Props> = ({ icon, ...btnProps }) => {
  return (
    <button
      className="block h-full cursor-pointer rounded-lg border bg-gray-50 py-2 px-4 text-sm hover:bg-gray-100 disabled:cursor-default disabled:text-gray-300 disabled:hover:bg-gray-50 dark:hover:bg-gray-600 dark:hover:text-white"
      type="button"
      {...btnProps}
    >
      {IconMap[icon]}
    </button>
  );
};

export default IconBtn;
