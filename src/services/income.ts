import { trpc } from "../utils/trpc";

export function getAllIncomes(
  month?: number | null,
  year?: number | null,
  categoryId?: string
) {
  return trpc.income.getUserIncome.useQuery({
    month,
    year,
    categoryId,
  });
}
