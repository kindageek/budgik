import React, { useState } from "react";
import { BiSad } from "react-icons/bi";

import type { Category } from "../../../types/types";
import CategoryTableHead from "./category-table-head.component";
import ConfirmationModal from "../../confirmation-modal/confirmation-modal.component";
import CategoryTableRow from "./category-table-row.component";

type Props = {
  data: Category[] | undefined;
  onEditRow: (rowId: string) => void;
  onDeleteRow: (rowId: string) => void;
};

const CategoryTable: React.FC<Props> = ({ data, onEditRow, onDeleteRow }) => {
  const [selectedRowId, setSelectedRowid] = useState<string | null>(null);

  const handleDeleteRow = () => {
    if (!selectedRowId) return;
    onDeleteRow(selectedRowId);
    setSelectedRowid(null);
  };

  return (
    <div className="relative w-full overflow-x-auto">
      <table className="w-full rounded-lg border text-left text-sm text-gray-700 dark:text-gray-400">
        <CategoryTableHead />
        <tbody>
          {data && data?.length > 0 ? (
            data.map((row) => (
              <CategoryTableRow
                key={row.id}
                row={row}
                onEditRow={onEditRow}
                onDeleteRow={setSelectedRowid}
              />
            ))
          ) : (
            <tr className="bg-whiteborder-b">
              <td align="center" className="border py-2 px-6" colSpan={100}>
                <div className="align-center flex flex-col justify-center py-4">
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

export default CategoryTable;
