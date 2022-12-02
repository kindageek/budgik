import React from "react";

import EditIconButton from "../../buttons/edit-icon-button.component";
import DeleteIconButton from "../../buttons/delete-icon-button.component";
import { numWithCommas } from "../../../utils/shared";

type Props = {
  row: any;
  date: string;
  index: number;
  size: number | undefined;
  sum: number;
  onEditRow: (rowId: string) => void;
  onDeleteRow: (rowId: string) => void;
};

const ExpensesTableRow: React.FC<Props> = ({
  row,
  date,
  index,
  size,
  sum,
  onEditRow,
  onDeleteRow,
}) => {
  return (
    <tr key={row.id} className="bg-whiteborder-b">
      {index === 0 && (
        <td align="left" className="border py-2 px-6" rowSpan={size}>
          {date}
        </td>
      )}
      <td align="left" className="border py-2 px-6">
        {row.name}
      </td>
      <td align="left" className="border py-2 px-6">
        {row.category.name}
      </td>
      <td align="right" className="border py-2 px-6">
        {`$${numWithCommas(row.value)}`}
      </td>
      {index === 0 && (
        <td
          align="right"
          className="text-md border py-2 px-6 font-semibold text-black"
          rowSpan={size}
        >
          ${numWithCommas(sum)}
        </td>
      )}
      <td align="center" className="border">
        <div className="flex items-center justify-center">
          <div className="mr-4 flex items-center justify-center">
            <EditIconButton onClick={() => onEditRow(row.id)} />
          </div>
          <div className="flex items-center justify-center">
            <DeleteIconButton onClick={() => onDeleteRow(row.id)} />
          </div>
        </div>
      </td>
    </tr>
  );
};

export default ExpensesTableRow;
