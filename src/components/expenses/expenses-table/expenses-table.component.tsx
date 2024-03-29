import React, { useMemo, useState } from "react";
import type { Category, Expense } from "@prisma/client";

import { formatDate, removeDuplicates } from "utils";
import type { Column } from "types";

import TableHead from "components/table/table-head.component";
import ExpensesTableRow from "./expenses-table-row.component";
import EmptyTableRow from "components/table/empty-table-row.component";
import ConfirmationModal from "components/confirmation-modal/confirmation-modal.component";
import TableContainer from "components/table/table-container.component";
import ExpenseCard from "../expense-card";

const COLUMNS: Column[] = [
  {
    key: "date",
    name: "Date",
    align: "left",
  },
  {
    key: "name",
    name: "Name",
    align: "left",
  },
  {
    key: "category",
    name: "Category",
    align: "left",
  },
  {
    key: "value",
    name: "Amount",
    align: "right",
  },
  {
    key: "",
    name: "Total Amount (day)",
    align: "right",
  },
  {
    key: "",
    name: "",
    align: "center",
  },
];

type ExpenseType = Expense & {
  category: Category;
};

interface GroupedExpenses {
  [key: string]: ExpenseType[];
}

type Props = {
  tableRef: React.MutableRefObject<HTMLTableElement | null>;
  data: ExpenseType[] | null | undefined;
  onEditItem: (rowId: string) => void;
  onDeleteItem: (rowId: string) => void;
  onDuplicateRow: (rowId: string) => void;
  loading?: boolean;
};

const ExpensesTable: React.FC<Props> = ({
  tableRef,
  data,
  onEditItem,
  onDeleteItem,
  onDuplicateRow,
  loading = false,
}) => {
  const rows: GroupedExpenses = useMemo(() => {
    if (!data || data.length === 0) return {};
    const res: GroupedExpenses = {};
    const dates: string[] = removeDuplicates(
      data.map((expense) => formatDate(expense.date))
    );
    for (const date of dates) {
      const expenses: ExpenseType[] = data.filter(
        (expense) => formatDate(expense.date) === date
      );
      res[date] = expenses;
    }
    return res;
  }, [data]);

  const [selectedRowId, setSelectedRowid] = useState<string | null>(null);

  const handleDeleteRow = () => {
    if (!selectedRowId) return;
    onDeleteItem(selectedRowId);
    setSelectedRowid(null);
  };

  const dates = Object.keys(rows).sort(
    (a, b) => new Date(a).valueOf() - new Date(b).valueOf()
  );

  const getTotalDayAmount = (expenses: ExpenseType[]) => {
    return expenses?.reduce((sum, row) => sum + row.value, 0);
  };

  return (
    <>
      <TableContainer tableRef={tableRef}>
        <TableHead columns={COLUMNS} />
        <tbody>
          {dates?.length > 0 ? (
            dates.map((date) => {
              const expenses = rows[date];
              return expenses?.map((expense, index) => (
                <ExpensesTableRow
                  key={expense.id}
                  row={expense}
                  date={date}
                  isFirstRow={index === 0}
                  sum={getTotalDayAmount(expenses)}
                  size={expenses?.length}
                  onEditRow={onEditItem}
                  onDeleteRow={setSelectedRowid}
                  onDuplicateRow={onDuplicateRow}
                />
              ));
            })
          ) : (
            <EmptyTableRow loading={loading} />
          )}
        </tbody>
      </TableContainer>
      <div className="flex h-full flex-col gap-3 overflow-auto md:hidden">
        {loading
          ? Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="flex h-12 w-full animate-pulse rounded-lg bg-gray-200 shadow"
              />
            ))
          : dates.map((date) => {
              const expenses = rows[date] || [];
              if (expenses.length === 0) return null;
              return (
                <ExpenseCard
                  key={date}
                  data={expenses}
                  date={date}
                  sum={getTotalDayAmount(expenses)}
                  onEditRow={onEditItem}
                  onDeleteRow={setSelectedRowid}
                  onDuplicateRow={onDuplicateRow}
                />
              );
            })}
      </div>
      <ConfirmationModal
        open={selectedRowId !== null}
        onClose={() => setSelectedRowid(null)}
        onSubmit={handleDeleteRow}
        title="Are you sure you want to delete this row?"
        className="hidden md:flex"
      />
    </>
  );
};

export default ExpensesTable;
