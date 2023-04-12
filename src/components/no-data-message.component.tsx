import React from "react";

const NoDataMessage: React.FC = () => {
  return (
    <div className="flex h-full w-full items-center justify-center text-center">
      <p className="text-center text-sm text-gray-400">No Data Available</p>
    </div>
  );
};

export default NoDataMessage;
