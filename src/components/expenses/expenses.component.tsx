import React, { useEffect, useState } from "react";

import { trpc } from "../../utils/trpc";
import { numWithCommas } from "../../utils/shared";
import type { UpdateExpense } from "../../types/types";

import ExpensesTable from "./expenses-table/expenses-table.component";
import CreateExpense from "./create-expense/create-expense.component";
import EditExpenseForm from "./edit-expense/edit-expense-form.component";
import MonthSelect from "../date-select/month-select.component";
import YearSelect from "../date-select/year-select.component";

const Expenses: React.FC = () => {
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(2023);

  const { data, isLoading, error, refetch } =
    trpc.expense.getUserExpenses.useQuery({ month, year });

  const { mutateAsync: deleteExpense } = trpc.expense.deleteExpense.useMutation(
    { onSuccess: () => refetch() }
  );

  const [expenses, setExpenses] = useState<{ [key: string]: any[] }>({});
  const [editExpenseData, setEditExpenseData] = useState<UpdateExpense | null>(
    null
  );

  useEffect(() => {
    if (!data) return;
    const res: { [key: string]: any[] } = {};
    data.forEach((row) => {
      const date = new Date(row.date).toISOString().split("T")[0];
      if (!date) return;
      if (!res[date]) {
        res[date] = [row];
      } else {
        res[date].push(row);
      }
    });
    setExpenses(res);
  }, [data]);

  const onDeleteItem = async (id: string) => {
    await deleteExpense({ id });
  };

  const onEditItem = (id: string) => {
    const row = data?.find((r) => r.id === id);
    if (!row) return;
    setEditExpenseData({
      id: row.id,
      date: row.date,
      name: row.name,
      value: row.value,
      categoryId: row.category.id,
    });
  };
  
  const getTotalExpenses = () => {
    return numWithCommas(
      data?.map((row) => row.value).reduce((sum, value) => sum + value, 0) || 0
    );
  };

  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full items-center justify-between">
        <h1 className="mb-6 text-5xl font-extrabold leading-normal text-gray-700">
          Expenses
        </h1>
      </div>
      {error ? <p className="text-red-500">{error.message}</p> : null}
      {isLoading ? <p>Loading...</p> : null}
      <div className="mb-4 flex w-full items-center justify-between">
        <div className="flex w-full items-center gap-4">
          <YearSelect year={year} onSelect={setYear} />
          <MonthSelect month={month} onSelect={setMonth} />
          <div className="flex items-center">
            <h5 className="mr-2 text-xl font-semibold">Total:</h5>
            <p className="text-xl font-medium">${getTotalExpenses()}</p>
          </div>
        </div>
        <CreateExpense onComplete={refetch} />
      </div>
      {Object.keys(expenses)?.length > 0 ? (
        <ExpensesTable
          expenses={expenses}
          onEditItem={onEditItem}
          onDeleteItem={onDeleteItem}
        />
      ) : (
        <p>No data found</p>
      )}
      {editExpenseData !== null ? (
        <EditExpenseForm
          data={editExpenseData}
          onClose={() => setEditExpenseData(null)}
          onComplete={refetch}
        />
      ) : null}
    </div>
  );
};

export default Expenses;
