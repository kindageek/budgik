import React from "react";

type Props = {
  title: string;
  noMargin?: boolean;
  total?: string;
};

const PageHeader: React.FC<Props> = ({ title, noMargin = false, total }) => {
  return (
    <div
      className={`flex w-full items-center justify-between ${
        noMargin ? "" : "mb-4 md:mb-6"
      }`}
    >
      <h1 className="text-3xl font-extrabold leading-normal text-gray-700 sm:text-4xl md:text-5xl">
        {title}
      </h1>
      {total && (
        <p className="block text-xl font-medium text-black sm:text-2xl lg:hidden">
          {total}
        </p>
      )}
    </div>
  );
};

export default PageHeader;
