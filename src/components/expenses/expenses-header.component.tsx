import React from "react";

import { trpc } from "../../utils/trpc";
import type { TableFilters } from "../../types/types";

import Loader from "../loader/loader.component";
import YearSelect from "../table-filters/year-select.component";
import MonthSelect from "../table-filters/month-select.component";
import CreateExpense from "./create-expense/create-expense.component";
import CategorySelect from "../table-filters/category-select.component";

type Props = {
  loading: boolean;
  totalExpenses: string;
  filters: TableFilters;
  onAddComplete: (v: string) => void;
  setFilters: (filters: TableFilters) => void;
};

const ALL_CATEGORIES = "All categories";

const ExpensesHeader: React.FC<Props> = ({
  filters,
  setFilters,
  totalExpenses,
  loading,
  onAddComplete,
}) => {
  const { data: categories, refetch: refetchCategories } =
    trpc.category.getExpenseCategories.useQuery();

  const handleYearSelect = (year: number) => {
    setFilters({ ...filters, year });
  };

  const handleMonthSelect = (month: number) => {
    setFilters({ ...filters, month });
  };

  const handleCategorySelect = (categoryName: string) => {
    const categoryId =
      categories?.find((c) => c.name === categoryName)?.id || ALL_CATEGORIES;
    setFilters({ ...filters, categoryId });
  };

  return (
    <div className="mb-4 flex w-full flex-col-reverse md:flex-row md:items-center md:justify-between gap-4">
      <div className="flex items-center gap-4 justify-between">
        <YearSelect year={filters.year} onSelect={handleYearSelect} />
        <MonthSelect month={filters.month} onSelect={handleMonthSelect} />
        <CategorySelect
          type="EXPENSE"
          category={
            categories?.find((c) => c.id === filters.categoryId)?.name ||
            ALL_CATEGORIES
          }
          categories={[
            ALL_CATEGORIES,
            ...(categories ? categories?.map((c) => c.name) : []),
          ]}
          onAddComplete={refetchCategories}
          onSelect={handleCategorySelect}
        />
      </div>
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex items-center">
          <h5 className="mr-2 text-lg sm:text-xl font-semibold text-gray-800">Total:</h5>
          <p className="text-xl sm:text-2xl font-medium text-black">{totalExpenses}</p>
        </div>
        {loading ? <Loader /> : null}
        <CreateExpense onComplete={onAddComplete} />
      </div>
    </div>
  );
};

export default ExpensesHeader;
