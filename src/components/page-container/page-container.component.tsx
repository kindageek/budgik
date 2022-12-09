import React from "react";

type Props = {
  children: React.ReactNode;
};

const PageContainer: React.FC<Props> = ({ children }) => {
  return (
    <div
      className={`flex h-full w-full flex-col overflow-hidden py-4 pb-2 px-4 sm:px-6 sm:py-8 sm:pb-4`}
    >
      {children}
    </div>
  );
};

export default PageContainer;
