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
  name: string;
  categoryId: string;
  value: number | null;
}

export interface UpdateExpense {
  id: string;
  date: Date;
  name: string;
  categoryId: string;
  value: number;
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
