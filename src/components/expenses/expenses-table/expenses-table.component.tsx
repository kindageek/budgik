import React from "react";
import type { Column } from "../../../types/types";
import DeleteIconButton from "../../buttons/delete-icon-button.component";
import EditIconButton from "../../buttons/edit-icon-button.component";

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
];

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
  const getTotalDayAmount = (key: string) => {
    return expenses[key]?.reduce((sum, row) => sum + row.value, 0);
  };
  return (
    <div className="relative w-full overflow-x-auto">
      <table className="w-full rounded-lg border text-left text-sm text-gray-500 dark:text-gray-400">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {COLUMNS.map(({ key, name, align }) => (
              <th key={key} align={align} scope="col" className="py-3 px-6">
                {name}
              </th>
            ))}
            <th align="right" scope="col" className="py-3 px-6">
              Total Amount (day)
            </th>
            <th align="center" scope="col" className="py-3 px-6" />
          </tr>
        </thead>
        <tbody>
          {Object.keys(expenses).map((key) => (
            <>
              {expenses[key]?.map((row, index) => (
                <tr key={row.id} className="bg-whiteborder-b">
                  {index === 0 && (
                    <td
                      align="left"
                      className="border py-4 px-6"
                      rowSpan={expenses[key]?.length}
                    >
                      {key}
                    </td>
                  )}
                  <td align="left" className="border py-4 px-6">
                    {row.name}
                  </td>
                  <td align="left" className="border py-4 px-6">
                    {row.category.name}
                  </td>
                  <td align="right" className="border py-4 px-6">
                    {`$${row.value}`}
                  </td>
                  {index === 0 && (
                    <td
                      align="right"
                      className="border py-4 px-6"
                      rowSpan={expenses[key]?.length}
                    >
                      {`$${getTotalDayAmount(key)}`}
                    </td>
                  )}
                  <td align="center" className="border">
                    <div className="flex items-center justify-center">
                      <div className="flex items-center justify-center mr-4">
                        <EditIconButton onClick={() => onEditItem(row.id)} />
                      </div>
                      <div className="flex items-center justify-center">
                        <DeleteIconButton
                          onClick={() => onDeleteItem(row.id)}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpensesTable;
