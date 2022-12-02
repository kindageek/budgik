import { trpc } from "../utils/trpc";

export function getAllExpenses() {
  return trpc.expense.getUserExpenses.useQuery();
}

export function createExpense() {
  return trpc.expense.createExpense.useMutation();
}
