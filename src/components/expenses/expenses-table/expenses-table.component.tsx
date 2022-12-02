import React, { useEffect, useState } from "react";
import { getAllExpenses } from "../../../services/expenses";
import type { Column } from "../../../types/types";

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

const ExpensesTable: React.FC = () => {
  const { data, isLoading, error } = getAllExpenses();

  const [expenses, setExpenses] = useState<{ [key: string]: any[] }>({});

  useEffect(() => {
    if (!data) return;
    const res: { [key: string]: any[] } = {};
    data.forEach((row) => {
      const date = new Date(row.date).toLocaleDateString();
      if (!res[date]) {
        res[date] = [row];
      } else {
        res[date].push(row);
      }
    });
    setExpenses(res);
  }, [data]);

  const getTotalDayAmount = (key: string) => {
    return expenses[key]?.reduce((sum, row) => sum + row.value, 0);
  };

  if (error) return <p className="text-red-500">{error.message}</p>;

  if (isLoading) return <p>Loading...</p>;

  if (!data) return null;

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
