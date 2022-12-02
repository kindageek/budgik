export interface Column {
  key: string;
  name: string;
  align: "left" | "center" | "right";
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