import type { ComponentProps, FC } from "react";

interface Props extends ComponentProps<"button"> {
  title?: string;
}

const SubmitBtn: FC<Props> = ({ title = "Save", ...btnProps }) => {
  return (
    <button
      className="rounded-lg bg-secondary-default px-6 py-2.5 text-sm font-medium uppercase text-white hover:bg-secondary-dark focus:outline-none focus:ring-4 focus:ring-secondary-light disabled:bg-gray-300 disabled:hover:bg-gray-300"
      type="submit"
      {...btnProps}
    >
      {title}
    </button>
  );
};

export default SubmitBtn;
