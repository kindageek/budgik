import { trpc } from "../utils/trpc";

export function getAllExpenses() {
  return trpc.user.getUserExpenses.useQuery();
}
