import React from "react";

import { trpc, MONTHS } from "utils";
import type { TableFilters } from "types";

import Loader from "../loader/loader.component";
import YearSelect from "../table-filters/year-select.component";
import MonthSelect from "../table-filters/month-select.component";
import CreateExpense from "./create-expense.component";
import CategorySelect from "../table-filters/category-select.component";
import { DownloadTableExcel } from "react-export-table-to-excel";
import DownloadIconButton from "../buttons/download-icon-button.component";

import IconBtn from "components/form/icon-btn";

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

  return (
    <div className="mb-4 flex w-full flex-col-reverse gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex h-full items-center justify-between gap-4">
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
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex items-center">
          <h5 className="mr-2 text-lg font-semibold text-gray-800 sm:text-xl">
            Total:
          </h5>
          <p className="text-xl font-medium text-black sm:text-2xl">
            {totalExpenses}
          </p>
        </div>
        <div className="flex items-center gap-4">
          {loading ? <Loader /> : null}
          {tableRef ? (
            <DownloadTableExcel
              filename="Expenses"
              sheet={`${MONTHS[(filters.month || 1) - 1]}, ${filters.year}`}
              currentTableRef={tableRef?.current}
            >
              <DownloadIconButton />
            </DownloadTableExcel>
          ) : null}
          <CreateExpense onComplete={onAddComplete} />
        </div>
      </div>
    </div>
  );
};

export default ExpensesHeader;
