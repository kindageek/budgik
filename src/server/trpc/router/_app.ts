import { router } from "../trpc";
import { authRouter } from "./auth";
import { categoryRouter } from './category';
import { expenseRouter } from './expense';
import { incomeRouter } from './income';

export const appRouter = router({
  auth: authRouter,
  expense: expenseRouter,
  category: categoryRouter,
  income: incomeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
