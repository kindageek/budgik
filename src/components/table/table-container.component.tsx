import React from "react";

type Props = {
  tableRef?: React.MutableRefObject<HTMLTableElement | null>;
  children: React.ReactNode;
  desktopOnly?: boolean;
};

const TableContainer: React.FC<Props> = ({
  children,
  tableRef,
  desktopOnly = true,
}) => {
  return (
    <div
      className={`relative w-full overflow-scroll rounded-lg border shadow-sm ${
        desktopOnly && "hidden md:flex"
      }`}
    >
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
