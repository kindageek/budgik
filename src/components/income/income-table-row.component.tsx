import React from "react";
import type { Category, Income } from "@prisma/client";

import { numWithCommas } from "utils";
import ExpensesTableRowActions from "components/expenses/expenses-table/expenses-table-row-actions.component";

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
    <tr key={row.id} className="border-b bg-white hover:bg-gray-100">
      {isFirstRow && (
        <td
          align="left"
          className="border border-l-0 py-2 px-6 text-base font-bold text-black sm:text-lg"
          rowSpan={size}
        >
          {date}
        </td>
      )}
      <td align="left" className="border py-2 px-6">
        {row.name}
      </td>
      <td align="left" className="border py-2 px-6">
        {row.category.name}
      </td>
      <td
        align="right"
        className="sm:text-md border py-2 px-6 text-base font-semibold text-black"
      >
        {`$${numWithCommas(row.value)}`}
      </td>
      <td align="center" className="border border-r-0">
        <ExpensesTableRowActions
          onEditRow={() => onEditRow(row.id)}
          onDeleteRow={() => onDeleteRow(row.id)}
          onDuplicateRow={() => onDuplicateRow(row.id)}
        />
      </td>
    </tr>
  );
};

export default IncomeTableRow;
