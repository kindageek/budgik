import React, { useMemo } from "react";

import { trpc } from "utils";
import type { TableFilters } from "types";

import AddIncome from "./add-income.component";
import YearSelect from "../table-filters/year-select.component";
import CategorySelect from "../table-filters/category-select.component";
import { MONTHS } from "../../utils/constants";
import IconBtn from "components/form/icon-btn";
import HeaderActions from "components/header-actions";
import { DEFAULT_FILTERS } from "./constants";

type Props = {
  tableRef: React.MutableRefObject<HTMLTableElement | null>;
  loading: boolean;
  totalIncome: string;
  filters: TableFilters;
  onAddComplete: (v: string) => void;
  setFilters: (filters: TableFilters) => void;
};

const ALL_CATEGORIES = "All categories";

const IncomeHeader: React.FC<Props> = ({
  tableRef,
  filters,
  setFilters,
  totalIncome,
  loading,
  onAddComplete,
}) => {
  const { data: years } = trpc.user.getYears.useQuery();
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

  const handleNextYear = () => {
    if (!(years || []).includes(filters.year + 1)) {
      return;
    }
    setFilters({
      ...filters,
      year: filters.year + 1,
    });
  };

  const handlePrevYear = () => {
    if (!(years || []).includes(filters.year - 1)) {
      return;
    }
    setFilters({
      ...filters,
      year: filters.year - 1,
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
    <div className="mb-4 flex w-full flex-col-reverse gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex h-full items-center gap-4">
        <div className="flex h-full items-center gap-2">
          <IconBtn
            icon="prev"
            onClick={() => handlePrevYear()}
            disabled={!(years || []).includes(filters.year - 1)}
          />
          <YearSelect year={filters.year} onSelect={handleYearSelect} />
          <IconBtn
            icon="next"
            onClick={() => handleNextYear()}
            disabled={!(years || []).includes(filters.year + 1)}
          />
        </div>
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
      <HeaderActions
        loading={loading}
        total={totalIncome}
        defaultSearchValue={filters.name}
        onSearch={handleSearch}
        table={{
          ref: tableRef,
          filename: "Income",
          sheetName: `${MONTHS[(filters.month || 1) - 1]}, ${filters.year}`,
        }}
        isDirty={isDirty}
        onReset={() => setFilters(DEFAULT_FILTERS)}
      >
        <AddIncome onComplete={onAddComplete} />
      </HeaderActions>
    </div>
  );
};

export default IncomeHeader;
