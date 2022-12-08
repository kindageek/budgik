import React, { useContext, useState } from "react";
import { Income } from "@prisma/client";

import { trpc } from "../../utils/trpc";
import type { NewIncome } from "../../types/types";
import { numWithCommas } from "../../utils/shared";
import SnackbarContext from "../../context/snackbar.context";

import Alert from "../alert/alert.component";
import AddIncome from "./add-income.component";
import Loader from "../loader/loader.component";
import IncomeForm from "./income-form.component";
import IncomeTable from "./income-table.component";
import YearSelect from "../table-filters/year-select.component";
import CategorySelect from "../table-filters/category-select.component";
import PageContainer from "../page-container/page-container.component";
import PageHeader from "../page-header/page-header.component";

const Income: React.FC = () => {
  const { openSnackbar } = useContext(SnackbarContext);
  const [year, setYear] = useState(new Date().getFullYear());
  const [editData, setEditData] = useState<Income | null>(null);
  const [categoryId, setCategoryId] = useState("All categories");

  const { data: categories, refetch: refetchCategories } =
    trpc.category.getIncomeCategories.useQuery();
  const { data, isLoading, error, refetch } =
    trpc.income.getUserIncome.useQuery({ year, categoryId });

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

  const { mutateAsync: deleteIncome } = trpc.income.delete.useMutation({
    onSuccess: (data) => {
      openSnackbar({ msg: data.message, type: "success" });
      refetch();
    },
  });
  const { mutateAsync: createIncome } = trpc.income.create.useMutation({
    onSuccess: (data) => {
      openSnackbar({ msg: data.message, type: "success" });
      refetch();
    },
  });

  const getTotal = () => {
    return numWithCommas(
      data?.map((row) => row.value).reduce((sum, value) => sum + value, 0) || 0
    );
  };

  const handleFormSubmit = (msg: string) => {
    openSnackbar({ msg, type: "success" });
    refetch();
  };

  const handleEditSubmit = (data: NewIncome) => {
    if (!editData?.id) return;
    editIncome({ ...data, date: new Date(data.date), id: editData.id });
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

  const handleCategorySelect = (categoryName: string) => {
    setCategoryId(
      categories?.find((c) => c.name === categoryName)?.id || "All categories"
    );
  };

  return (
    <PageContainer>
      <PageHeader title="Income" />
      <div className="mb-4 flex w-full items-center justify-between">
        <div className="flex w-full items-center gap-4">
          <YearSelect year={year} onSelect={setYear} />
          <CategorySelect
            type="INCOME"
            category={
              categories?.find((c) => c.id === categoryId)?.name ||
              "All categories"
            }
            categories={[
              "All categories",
              ...(categories ? categories?.map((c) => c.name) : []),
            ]}
            onAddComplete={refetchCategories}
            onSelect={handleCategorySelect}
          />
          <div className="flex items-center">
            <h5 className="mr-2 text-xl font-semibold text-gray-800">Total:</h5>
            <p className="text-2xl font-medium text-black">${getTotal()}</p>
          </div>
          {isLoading ? <Loader /> : null}
        </div>
        <AddIncome onComplete={handleFormSubmit} />
      </div>
      {error ? <Alert message={error.message} /> : null}
      <IncomeTable
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
