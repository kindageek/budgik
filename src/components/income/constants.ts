import type { TableFilters } from "types/types";

export const DEFAULT_FILTERS: TableFilters = {
  month: null,
  year: new Date().getFullYear(),
  categoryId: "All categories",
  name: "",
};
