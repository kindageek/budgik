import React from "react";

type Props = {
  children: React.ReactNode;
};

const PageContainer: React.FC<Props> = ({ children }) => {
  return <div className="flex h-full w-full flex-col">{children}</div>;
};

export default PageContainer;
