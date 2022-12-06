import { trpc } from "../utils/trpc";

export function getAllExpenses(
  month?: number,
  year?: number,
  categoryId?: string
) {
  return trpc.expense.getUserExpenses.useQuery({
    month,
    year,
    categoryId,
  });
}
