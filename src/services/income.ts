import { trpc } from "../utils/trpc";

export function getAllIncomes(
  month?: number,
  year?: number,
  categoryId?: string
) {
  return trpc.income.getUserIncome.useQuery({
    month,
    year,
    categoryId,
  });
}
