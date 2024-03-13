import React, { useContext, useEffect, useRef, useState } from "react";

import { trpc, numWithCommas } from "utils";
import type { IExpense, TableFilters, UpdateExpense } from "types";
import SnackbarContext from "context/snackbar.context";

import Alert from "../alert/alert.component";
import ExpensesHeader from "./expenses-header.component";
import PageHeader from "../page-header/page-header.component";
import ExpensesTable from "./expenses-table/expenses-table.component";
import PageContainer from "../page-container/page-container.component";
import ExpenseForm from "./expense-form.component";
import { DEFAULT_FILTERS } from "./constants";

const Expenses: React.FC = () => {
  const { openSnackbar } = useContext(SnackbarContext);
  const tableRef = useRef<HTMLTableElement | null>(null);
  const [filters, setFilters] = useState<TableFilters>(DEFAULT_FILTERS);

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

  const {
    mutateAsync: editExpense,
    isLoading: isEditLoading,
    error: editError,
  } = trpc.expense.edit.useMutation({
    onSuccess: (data) => {
      openSnackbar({ msg: data.message, type: "success" });
      setEditExpenseData(null);
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

  const handleEditSubmit = (data: IExpense) => {
    if (!editExpenseData?.id) return;
    editExpense({
      ...data,
      date: new Date(data.date),
      id: editExpenseData.id,
      name: data.expenseName,
    });
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

  useEffect(() => {
    if (!tableRef?.current) return;
    const lastTableRow = tableRef.current.lastElementChild?.lastElementChild;
    if (lastTableRow) {
      lastTableRow.scrollIntoView({ behavior: "smooth" });
    }
  }, [data, tableRef]);

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
      <ExpenseForm
        open={editExpenseData !== null}
        data={editExpenseData}
        onClose={() => setEditExpenseData(null)}
        onSubmit={handleEditSubmit}
        errorMessage={editError?.message}
        isLoading={isEditLoading}
      />
    </PageContainer>
  );
};

export default Expenses;
