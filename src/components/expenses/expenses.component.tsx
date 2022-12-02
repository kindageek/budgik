import React, { useEffect, useState } from "react";

import { trpc } from "../../utils/trpc";
import type { UpdateExpense } from "../../types/types";

import ExpensesTable from "./expenses-table/expenses-table.component";
import CreateExpense from "./create-expense/create-expense.component";
import EditExpenseForm from "./edit-expense/edit-expense-form.component";

const Expenses: React.FC = () => {
  const { data, isLoading, error, refetch } =
    trpc.expense.getUserExpenses.useQuery();

  const { mutateAsync: deleteExpense } = trpc.expense.deleteExpense.useMutation(
    { onSuccess: () => refetch() }
  );

  const [expenses, setExpenses] = useState<{ [key: string]: any[] }>({});
  const [editExpenseData, setEditExpenseData] = useState<UpdateExpense | null>(null);

  useEffect(() => {
    if (!data) return;
    const res: { [key: string]: any[] } = {};
    data.forEach((row) => {
      const date = new Date(row.date).toISOString().split('T')[0];
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

  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full items-center justify-between">
        <h1 className="mb-6 text-5xl font-extrabold leading-normal text-gray-700">
          Expenses
        </h1>
        <CreateExpense onComplete={refetch} />
      </div>
      {error ? <p className="text-red-500">{error.message}</p> : null}
      {isLoading ? <p>Loading...</p> : null}
      <ExpensesTable
        expenses={expenses}
        onEditItem={onEditItem}
        onDeleteItem={onDeleteItem}
      />
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
