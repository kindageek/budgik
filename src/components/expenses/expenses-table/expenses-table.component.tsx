import React, { useState } from "react";

import ExpensesTableHead from "./expenses-table-head.component";
import EditIconButton from "../../buttons/edit-icon-button.component";
import DeleteIconButton from "../../buttons/delete-icon-button.component";
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
          {Object.keys(expenses).map((key) => {
            return expenses[key]?.map((row, index) => (
              <ExpensesTableRow
                key={row.id}
                row={row}
                date={key}
                index={index}
                sum={getTotalDayAmount(key)}
                size={expenses[key]?.length}
                onEditRow={onEditItem}
                onDeleteRow={onDeleteItem}
              />
            ));
          })}
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
