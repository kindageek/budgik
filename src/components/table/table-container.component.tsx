import React from "react";

type Props = {
  children: React.ReactNode;
};

const TableContainer: React.FC<Props> = ({ children }) => {
  return (
    <div className="relative w-full overflow-scroll border shadow-sm rounded-lg">
      <table className="w-full rounded-lg text-left text-sm text-gray-700 dark:text-gray-400">
        {children}
      </table>
    </div>
  );
};

export default TableContainer;
