import React from "react";

import type { Row } from "types";

type Props = {
  row: Row;
};

const TableRow: React.FC<Props> = ({ row }) => {
  if (!row) return null;
  
  const length = row.values.length;
  
  return (
    <tr key={row.id} className="bg-white border-b hover:bg-gray-100">
      {row.values.map(({ value, align, width }, index) => (
        <td
          key={index}
          align={align || "left"}
          className={`border py-2 px-6 ${index === 0 ? "border-l-0" : ""} ${
            index === length - 1 ? "border-r-0" : ""
          }`}
          width={width || "auto"}
        >
          {value}
        </td>
      ))}
    </tr>
  );
};

export default TableRow;
