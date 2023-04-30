import React from "react";
import type { Category, Expense } from "@prisma/client";
import { numWithCommas } from "utils";
import ExpensesTableRowActions from "./expenses-table-row-actions.component";

type Props = {
  row: Expense & {
    category: Category;
  };
  date: string;
  isFirstRow: boolean;
  size: number | undefined;
  sum: number;
  onEditRow: (rowId: string) => void;
  onDeleteRow: (rowId: string) => void;
  onDuplicateRow: (rowId: string) => void;
};

const ExpensesTableRow: React.FC<Props> = ({
  row,
  date,
  isFirstRow,
  size,
  sum,
  onEditRow,
  onDeleteRow,
  onDuplicateRow,
}) => {
  return (
    <tr
      key={row.id}
      className="border-b bg-white hover:bg-gray-100"
    >
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
        className="text-md border py-2 px-6 font-semibold text-black"
      >
        {`$${numWithCommas(row.value)}`}
      </td>
      {isFirstRow && (
        <td
          align="right"
          className="text-md border py-2 px-6 text-base font-bold text-black sm:text-lg"
          rowSpan={size}
        >
          ${numWithCommas(sum)}
        </td>
      )}
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

export default ExpensesTableRow;
