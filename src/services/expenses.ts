import { trpc } from "../utils/trpc";

export function getAllExpenses(
  month?: number | null,
  year?: number | null,
  categoryId?: string
) {
  return trpc.expense.getUserExpenses.useQuery({
    month,
    year,
    categoryId,
  });
}
