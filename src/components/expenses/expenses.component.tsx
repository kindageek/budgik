import React, { useContext, useRef, useState } from "react";

import { trpc } from "../../utils/trpc";
import { numWithCommas } from "../../utils/shared";
import type { TableFilters, UpdateExpense } from "../../types/types";
import SnackbarContext from "../../context/snackbar.context";

import Alert from "../alert/alert.component";
import ExpensesHeader from "./expenses-header.component";
import PageHeader from "../page-header/page-header.component";
import ExpensesTable from "./expenses-table/expenses-table.component";
import PageContainer from "../page-container/page-container.component";
import EditExpenseForm from "./edit-expense/edit-expense-form.component";

const Expenses: React.FC = () => {
  const { openSnackbar } = useContext(SnackbarContext);
  const tableRef = useRef(null);
  const [filters, setFilters] = useState<TableFilters>({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    categoryId: "All categories",
  });

  const { data, isLoading, error, refetch } =
    trpc.expense.getUserExpenses.useQuery(filters);

  const { mutateAsync: deleteExpense, isLoading: isDeleteLoading } =
    trpc.expense.delete.useMutation({
      onSuccess: (data) => {
        openSnackbar({ msg: data.message, type: "success" });
        refetch();
      },
    });

  const { mutateAsync: createExpense, isLoading: isCreateLoading } =
    trpc.expense.create.useMutation({
      onSuccess: (data) => {
        openSnackbar({ msg: data.message, type: "success" });
        refetch();
      },
    });

  const [editExpenseData, setEditExpenseData] = useState<UpdateExpense | null>(
    null
  );

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
    return (
      "$" +
      numWithCommas(
        data?.map((row) => row.value).reduce((sum, value) => sum + value, 0) ||
          0
      )
    );
  };

  return (
    <PageContainer>
      <PageHeader title="Expenses" />
      <ExpensesHeader
        tableRef={tableRef}
        filters={filters}
        setFilters={setFilters}
        totalExpenses={getTotalExpenses()}
        onAddComplete={handleAddComplete}
        loading={isLoading || isCreateLoading || isDeleteLoading}
      />
      {error ? <Alert message={error.message} /> : null}
      <ExpensesTable
        tableRef={tableRef}
        data={data}
        loading={isLoading}
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
    </PageContainer>
  );
};

export default Expenses;
