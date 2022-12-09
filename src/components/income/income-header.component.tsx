import React from "react";

import { trpc } from "../../utils/trpc";
import type { TableFilters } from "../../types/types";

import AddIncome from "./add-income.component";
import Loader from "../loader/loader.component";
import YearSelect from "../table-filters/year-select.component";
import CategorySelect from "../table-filters/category-select.component";

type Props = {
  loading: boolean;
  totalIncome: string;
  filters: TableFilters;
  onAddComplete: (v: string) => void;
  setFilters: (filters: TableFilters) => void;
};

const ALL_CATEGORIES = "All categories";

const IncomeHeader: React.FC<Props> = ({
  filters,
  setFilters,
  totalIncome,
  loading,
  onAddComplete,
}) => {
  const { data: categories, refetch: refetchCategories } =
    trpc.category.getIncomeCategories.useQuery();

  const handleYearSelect = (year: number) => {
    setFilters({ ...filters, year });
  };

  const handleCategorySelect = (categoryName: string) => {
    const categoryId =
      categories?.find((c) => c.name === categoryName)?.id || ALL_CATEGORIES;
    setFilters({ ...filters, categoryId });
  };

  return (
    <div className="mb-4 flex w-full flex-col-reverse gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-4">
        <YearSelect year={filters.year} onSelect={handleYearSelect} />
        <CategorySelect
          type="INCOME"
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
            {totalIncome}
          </p>
        </div>
        {loading ? <Loader /> : null}
        <AddIncome onComplete={onAddComplete} />
      </div>
    </div>
  );
};

export default IncomeHeader;
