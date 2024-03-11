import type { ComponentProps, FC } from "react";

interface Props extends ComponentProps<"button"> {
  title?: string;
}

const CancelBtn: FC<Props> = ({ title = "Cancel", ...btnProps }) => {
  return (
    <button
      className="background-transparent mr-2 rounded-lg px-6 py-2.5 text-sm font-bold uppercase text-secondary-dark outline-none transition-all duration-150 ease-linear hover:bg-secondary-100 focus:outline-none disabled:text-gray-300 disabled:hover:bg-transparent"
      type="button"
      {...btnProps}
    >
      {title}
    </button>
  );
};

export default CancelBtn;
