import React, { useState } from "react";
import { BiSad } from "react-icons/bi";

import ExpensesTableHead from "./expenses-table-head.component";
import ConfirmationModal from "../../confirmation-modal/confirmation-modal.component";
import ExpensesTableRow from "./expenses-table-row.component";

type Props = {
  expenses: { [key: string]: any[] };
  onEditItem: (rowId: string) => void;
  onDeleteItem: (rowId: string) => void;
};

const ExpensesTable: React.FC<Props> = ({
  expenses,
  onEditItem,
  onDeleteItem,
}) => {
  const dates = Object.keys(expenses);
  const [selectedRowId, setSelectedRowid] = useState<string | null>(null);

  const getTotalDayAmount = (key: string) => {
    return expenses[key]?.reduce((sum, row) => sum + row.value, 0);
  };

  const handleDeleteRow = () => {
    if (!selectedRowId) return;
    onDeleteItem(selectedRowId);
    setSelectedRowid(null);
  };

  return (
    <div className="relative w-full overflow-x-auto">
      <table className="w-full rounded-lg border text-left text-sm text-gray-700 dark:text-gray-400">
        <ExpensesTableHead />
        <tbody>
          {dates?.length > 0 ? (
            dates.map((date) => {
              const dateEntries = expenses[date];
              return dateEntries?.map((row, index) => (
                <ExpensesTableRow
                  key={row.id}
                  row={row}
                  date={date}
                  index={index}
                  sum={getTotalDayAmount(date)}
                  size={dateEntries?.length}
                  onEditRow={onEditItem}
                  onDeleteRow={setSelectedRowid}
                />
              ));
            })
          ) : (
            <tr className="bg-whiteborder-b">
              <td align="center" className="border py-2 px-6" colSpan={100}>
                <div className="items-center flex flex-col justify-center py-4">
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
      <ConfirmationModal
        open={selectedRowId !== null}
        onClose={() => setSelectedRowid(null)}
        onSubmit={handleDeleteRow}
        title="Are you sure you want to delete this row?"
      />
    </div>
  );
};

export default ExpensesTable;
