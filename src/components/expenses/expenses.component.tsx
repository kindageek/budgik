import React, { useContext, useEffect, useState } from "react";

import { trpc } from "../../utils/trpc";
import { numWithCommas } from "../../utils/shared";
import type { UpdateExpense } from "../../types/types";

import ExpensesTable from "./expenses-table/expenses-table.component";
import CreateExpense from "./create-expense/create-expense.component";
import EditExpenseForm from "./edit-expense/edit-expense-form.component";
import MonthSelect from "../date-select/month-select.component";
import YearSelect from "../date-select/year-select.component";
import Alert from "../alert/alert.component";
import Loader from "../loader/loader.component";
import SnackbarContext from "../../context/snackbar.context";
import Dropdown from "../dropdown/dropdown.component";

const Expenses: React.FC = () => {
  const { openSnackbar } = useContext(SnackbarContext);

  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  const { data, isLoading, error, refetch } =
    trpc.expense.getUserExpenses.useQuery({ month, year });

  const { mutateAsync: deleteExpense } = trpc.expense.delete.useMutation({
    onSuccess: (data) => {
      openSnackbar({ msg: data.message, type: "success" });
      refetch();
    },
  });

  const { mutateAsync: createExpense } = trpc.expense.create.useMutation({
    onSuccess: (data) => {
      openSnackbar({ msg: data.message, type: "success" });
      refetch();
    },
  });

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

  const handleAddComplete = (msg: string) => {
    openSnackbar({ msg, type: "success" });
    refetch();
  };

  const onDeleteItem = async (id: string) => {
    await deleteExpense({ id });
  };

  const handleEditComplete = (msg: string) => {
    openSnackbar({ msg, type: "success" });
    setEditExpenseData(null);
    refetch();
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

  const onDuplicateRow = (id: string) => {
    const row = data?.find((r) => r.id === id);
    if (!row) return;
    createExpense({
      value: row.value,
      name: row.name,
      categoryId: row.category.id,
      date: row.date.toString(),
    });
  };

  const getTotalExpenses = () => {
    return numWithCommas(
      data?.map((row) => row.value).reduce((sum, value) => sum + value, 0) || 0
    );
  };

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex w-full items-center justify-between">
        <h1 className="mb-6 text-5xl font-extrabold leading-normal text-gray-700">
          Expenses
        </h1>
      </div>
      <div className="mb-4 flex w-full items-center justify-between">
        <div className="flex w-full items-center gap-4">
          <YearSelect year={year} onSelect={setYear} />
          <MonthSelect month={month} onSelect={setMonth} />
          <div className="flex items-center">
            <h5 className="mr-2 text-xl font-semibold text-gray-800">Total:</h5>
            <p className="text-2xl font-medium text-black">
              ${getTotalExpenses()}
            </p>
          </div>
          {isLoading ? <Loader /> : null}
        </div>
        <CreateExpense onComplete={handleAddComplete} />
      </div>
      {error ? <Alert message={error.message} /> : null}
      <ExpensesTable
        loading={isLoading}
        expenses={expenses}
        onEditItem={onEditItem}
        onDeleteItem={onDeleteItem}
        onDuplicateRow={onDuplicateRow}
      />
      <EditExpenseForm
        open={editExpenseData !== null}
        data={editExpenseData}
        onClose={() => setEditExpenseData(null)}
        onComplete={handleEditComplete}
      />
    </div>
  );
};

export default Expenses;
