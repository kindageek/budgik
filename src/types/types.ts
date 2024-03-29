export type MonthName =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";
export interface Column {
  key: string;
  name: string;
  align?: "left" | "center" | "right";
}

export interface TableCell {
  value: string | number | React.ReactNode;
  align?: "left" | "center" | "right";
  width?: string;
}

export interface Row {
  id: string;
  values: TableCell[];
}

export interface IExpense {
  date: string;
  expenseName: string;
  categoryId: string;
  value: number;
}

export interface UpdateExpense {
  id: string;
  date: Date;
  name: string;
  categoryId: string;
  value: number;
}

export interface TableFilters {
  month: number | null;
  year: number;
  categoryId: string;
  name: string;
}

enum CategoryType {
  INCOME,
  EXPENSE,
}

export interface Category {
  id: string;
  name: string;
  type: CategoryType;
}

export interface SnackbarState {
  msg: string;
  type: "success" | "error";
}

export interface Tab {
  title: string;
  href: string;
}

export interface NewCategory {
  name: string;
  type: "INCOME" | "EXPENSE";
}

export interface NewIncome {
  date: string;
  incomeName: string;
  categoryId: string;
  value: number;
}

export interface ChartData {
  name: string;
  value: number;
}

export interface NestedLink {
  title: string;
  url: string;
  icon?: React.ReactNode;
}
