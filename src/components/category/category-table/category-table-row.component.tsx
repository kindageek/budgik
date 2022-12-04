import React from "react";

import type { Category } from "../../../types/types";
import EditIconButton from "../../buttons/edit-icon-button.component";
import DeleteIconButton from "../../buttons/delete-icon-button.component";

type Props = {
  row: Category;
  onEditRow: (rowId: string) => void;
  onDeleteRow: (rowId: string) => void;
};

const CategoryTableRow: React.FC<Props> = ({ row, onEditRow, onDeleteRow }) => {
  return (
    <tr key={row.id} className="bg-whiteborder-b">
      <td align="left" className="border border-l-0 py-2 px-6" width="90%">
        {row.name}
      </td>
      <td align="center" className="border border-r-0">
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

export default CategoryTableRow;
