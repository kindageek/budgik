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
      <td align="left" className="border py-2 px-6">
        {row.id}
      </td>
      <td align="left" className="border py-2 px-6">
        {row.name}
      </td>
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

export default CategoryTableRow;
