import React from "react";

type Props = {
  title: string;
};

const PageHeader: React.FC<Props> = ({ title }) => {
  return (
    <div className="flex w-full items-center justify-between">
      <h1 className="mb-6 text-5xl font-extrabold leading-normal text-gray-700">
        {title}
      </h1>
    </div>
  );
};

export default PageHeader;
