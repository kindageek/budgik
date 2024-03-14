import React from "react";

type Props = {
  tableRef?: React.MutableRefObject<HTMLTableElement | null>;
  children: React.ReactNode;
};

const TableContainer: React.FC<Props> = ({ children, tableRef }) => {
  return (
    <div className="relative hidden w-full overflow-scroll rounded-lg border shadow-sm md:flex">
      <table
        ref={tableRef}
        className="w-full rounded-lg text-left text-sm text-gray-700 dark:text-gray-400"
      >
        {children}
      </table>
    </div>
  );
};

export default TableContainer;
