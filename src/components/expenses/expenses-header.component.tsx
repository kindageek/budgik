import React, { useMemo } from "react";

import { trpc, MONTHS } from "utils";
import type { TableFilters } from "types";

import YearSelect from "../table-filters/year-select.component";
import MonthSelect from "../table-filters/month-select.component";
import CreateExpense from "./create-expense.component";
import CategorySelect from "../table-filters/category-select.component";

import IconBtn from "components/form/icon-btn";
import HeaderActions from "components/header-actions";
import { DEFAULT_FILTERS } from "./constants";

type Props = {
  tableRef: React.MutableRefObject<HTMLTableElement | null>;
  loading: boolean;
  totalExpenses: string;
  filters: TableFilters;
  onAddComplete: (v: string) => void;
  setFilters: (filters: TableFilters) => void;
};

const ALL_CATEGORIES = "All categories";

const ExpensesHeader: React.FC<Props> = ({
  tableRef,
  filters,
  setFilters,
  totalExpenses,
  loading,
  onAddComplete,
}) => {
  const { data: years } = trpc.user.getYears.useQuery();
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

  const handleNextMonth = () => {
    if (filters.month === 12) {
      if (!(years || []).includes(filters.year + 1)) {
        return;
      }
      setFilters({
        ...filters,
        month: 1,
        year: filters.year + 1,
      });
      return;
    }
    setFilters({
      ...filters,
      month: (filters.month || 0) + 1,
    });
  };

  const handlePrevMonth = () => {
    if (filters.month === 1) {
      if (!(years || []).includes(filters.year - 1)) {
        return;
      }
      setFilters({
        ...filters,
        month: 12,
        year: filters.year - 1,
      });
      return;
    }
    setFilters({
      ...filters,
      month: (filters.month || 0) - 1,
    });
  };

  const handleSearch = (query: string) => {
    setFilters({ ...filters, name: query });
  };

  const isDirty = useMemo(
    () => JSON.stringify(filters) !== JSON.stringify(DEFAULT_FILTERS),
    [filters]
  );

  return (
    <div className="mb-4 flex w-full flex-col-reverse gap-2 md:gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex h-full flex-col gap-2 sm:flex-row sm:items-center md:gap-4">
        <div className="flex h-full items-center justify-between gap-2">
          <IconBtn
            icon="prev"
            onClick={() => handlePrevMonth()}
            disabled={
              filters.month === 1 && !(years || []).includes(filters.year - 1)
            }
          />
          <YearSelect year={filters.year} onSelect={handleYearSelect} />
          <MonthSelect
            month={filters.month || new Date().getMonth() + 1}
            onSelect={handleMonthSelect}
          />
          <IconBtn
            icon="next"
            onClick={() => handleNextMonth()}
            disabled={
              filters.month === 12 && !(years || []).includes(filters.year + 1)
            }
          />
        </div>
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
      <HeaderActions
        loading={loading}
        total={totalExpenses}
        defaultSearchValue={filters.name}
        onSearch={handleSearch}
        table={{
          ref: tableRef,
          filename: "Expenses",
          sheetName: `${MONTHS[(filters.month || 1) - 1]}, ${filters.year}`,
        }}
        isDirty={isDirty}
        onReset={() => setFilters(DEFAULT_FILTERS)}
      >
        <CreateExpense onComplete={onAddComplete} />
      </HeaderActions>
    </div>
  );
};

export default ExpensesHeader;
