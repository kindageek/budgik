import { trpc } from "../utils/trpc";

export function getAllCategories() {
  return trpc.category.getAll.useQuery();
}
