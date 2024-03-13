import type { TableFilters } from "types/types";

export const DEFAULT_FILTERS: TableFilters = {
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear(),
  categoryId: "All categories",
  name: "",
};
