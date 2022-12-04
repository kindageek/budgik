import React from "react";
import { BiSad } from "react-icons/bi";

import type { Column, Row } from "../../types/types";

import TableHead from "./table-head.component";
import TableRow from "./table-row.component";

type Props = {
  columns: Column[];
  rows: Row[] | undefined;
};

const Table: React.FC<Props> = ({ columns, rows }) => {
  return (
    <div className="relative h-full w-full overflow-scroll border">
      <table className="w-full rounded-lg text-left text-sm text-gray-700 dark:text-gray-400">
        <TableHead columns={columns} />
        <tbody>
          {rows && rows?.length > 0 ? (
            rows.map((row) => <TableRow key={row.id} row={row} />)
          ) : (
            <tr className="bg-whiteborder-b">
              <td align="center" className="border py-2 px-6" colSpan={100}>
                <div className="flex flex-col items-center justify-center py-4">
                  <BiSad size={64} color="grey" />
                  <h3 className="mt-4 text-center text-xl font-medium text-gray-500">
                    No data
                  </h3>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
