import React, { useContext, useRef, useState } from "react";
import { Income } from "@prisma/client";

import { trpc, numWithCommas } from "utils";
import type { NewIncome, TableFilters } from "types";
import SnackbarContext from "context/snackbar.context";

import Alert from "../alert/alert.component";
import IncomeForm from "./income-form.component";
import IncomeTable from "./income-table.component";
import PageContainer from "../page-container/page-container.component";
import PageHeader from "../page-header/page-header.component";
import IncomeHeader from "./income-header.component";

const Income: React.FC = () => {
  const { openSnackbar } = useContext(SnackbarContext);
  const [editData, setEditData] = useState<Income | null>(null);
  const tableRef = useRef(null);

  const [filters, setFilters] = useState<TableFilters>({
    month: null,
    year: new Date().getFullYear(),
    categoryId: "All categories",
  });

  const { data, isLoading, error, refetch } =
    trpc.income.getUserIncome.useQuery(filters);

  const {
    mutateAsync: editIncome,
    isLoading: isEditLoading,
    error: editError,
  } = trpc.income.edit.useMutation({
    onSuccess: (data) => {
      openSnackbar({ msg: data.message, type: "success" });
      setEditData(null);
      refetch();
    },
  });

  const { mutateAsync: deleteIncome, isLoading: isDeleteLoading } =
    trpc.income.delete.useMutation({
      onSuccess: (data) => {
        openSnackbar({ msg: data.message, type: "success" });
        refetch();
      },
    });

  const { mutateAsync: createIncome, isLoading: isCreateLoading } =
    trpc.income.create.useMutation({
      onSuccess: (data) => {
        openSnackbar({ msg: data.message, type: "success" });
        refetch();
      },
    });

  const getTotal = () => {
    return (
      "$" +
      numWithCommas(
        data?.map((row) => row.value).reduce((sum, value) => sum + value, 0) ||
          0
      )
    );
  };

  const handleFormSubmit = (msg: string) => {
    openSnackbar({ msg, type: "success" });
    refetch();
  };

  const handleEditSubmit = (data: NewIncome) => {
    if (!editData?.id) return;
    editIncome({
      ...data,
      date: new Date(data.date),
      id: editData.id,
      name: data.incomeName,
    });
  };

  const handleDelete = (id: string) => {
    deleteIncome({ id });
  };

  const handleEdit = (id: string) => {
    const income = data?.find((row) => row.id === id);
    if (!income) return;
    setEditData(income);
  };

  const handleDuplicateRow = (id: string) => {
    const row = data?.find((r) => r.id === id);
    if (!row) return;
    createIncome({
      value: row.value,
      name: row.name,
      categoryId: row.category.id,
      date: row.date.toString(),
    });
  };

  return (
    <PageContainer>
      <PageHeader title="Income" />
      <IncomeHeader
        tableRef={tableRef}
        filters={filters}
        setFilters={setFilters}
        totalIncome={getTotal()}
        onAddComplete={handleFormSubmit}
        loading={isLoading || isCreateLoading || isDeleteLoading}
      />
      {error ? <Alert message={error.message} /> : null}
      <IncomeTable
        tableRef={tableRef}
        data={data}
        loading={isLoading}
        onEditRow={handleEdit}
        onDeleteRow={handleDelete}
        onDuplicateRow={handleDuplicateRow}
      />
      <IncomeForm
        open={editData !== null}
        data={editData}
        onClose={() => setEditData(null)}
        onSubmit={handleEditSubmit}
        errorMessage={editError?.message}
        isLoading={isEditLoading}
      />
    </PageContainer>
  );
};

export default Income;
