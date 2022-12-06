import React from "react";
import type { Category, Income } from "@prisma/client";

import { numWithCommas } from "../../utils/shared";

import EditIconButton from "../buttons/edit-icon-button.component";
import DeleteIconButton from "../buttons/delete-icon-button.component";
import DuplicateIconButton from "../buttons/duplicate-icon-button.component";

type Props = {
  row: Income & {
    category: Category;
  };
  date: string;
  isFirstRow: boolean;
  size: number | undefined;
  onEditRow: (rowId: string) => void;
  onDeleteRow: (rowId: string) => void;
  onDuplicateRow: (rowId: string) => void;
};

const IncomeTableRow: React.FC<Props> = ({
  row,
  date,
  isFirstRow,
  size,
  onEditRow,
  onDeleteRow,
  onDuplicateRow,
}) => {
  return (
    <tr key={row.id} className="bg-whiteborder-b">
      {isFirstRow && (
        <td align="left" className="border border-l-0 py-2 px-6 font-bold text-lg text-black" rowSpan={size}>
          {date}
        </td>
      )}
      <td align="left" className="border py-2 px-6">
        {row.name}
      </td>
      <td align="left" className="border py-2 px-6">
        {row.category.name}
      </td>
      <td align="right" className="border py-2 px-6 font-semibold text-md text-black">
        {`$${numWithCommas(row.value)}`}
      </td>
      <td align="center" className="border border-r-0">
        <div className="flex items-center justify-center">
          <div className="mr-4 flex items-center justify-center">
            <EditIconButton onClick={() => onEditRow(row.id)} />
          </div>
          <div className="mr-4 flex items-center justify-center">
            <DeleteIconButton onClick={() => onDeleteRow(row.id)} />
          </div>
          <div className="mr-4 flex items-center justify-center">
            <DuplicateIconButton onClick={() => onDuplicateRow(row.id)} />
          </div>
        </div>
      </td>
    </tr>
  );
};

export default IncomeTableRow;
