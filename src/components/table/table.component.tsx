import React from "react";

import type { Column, Row } from "types";

import TableHead from "./table-head.component";
import TableRow from "./table-row.component";
import EmptyTableRow from "./empty-table-row.component";
import TableContainer from "./table-container.component";

type Props = {
  columns: Column[];
  rows: Row[];
  loading?: boolean;
  desktopOnly?: boolean;
};

const Table: React.FC<Props> = ({
  columns,
  rows,
  loading = false,
  desktopOnly = true,
}) => {
  return (
    <TableContainer desktopOnly={desktopOnly}>
      <TableHead columns={columns} />
      <tbody>
        {rows && rows?.length > 0 ? (
          rows.map((row) => <TableRow key={row.id} row={row} />)
        ) : (
          <EmptyTableRow loading={loading} />
        )}
      </tbody>
    </TableContainer>
  );
};

export default Table;
