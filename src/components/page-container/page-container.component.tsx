import React from "react";

type Props = {
  overflow?: boolean;
  children: React.ReactNode;
};

const PageContainer: React.FC<Props> = ({ children, overflow = false }) => {
  return (
    <div className={`flex h-full w-full flex-col py-4 px-6 overflow-hidden`}>{children}</div>
  );
};

export default PageContainer;
