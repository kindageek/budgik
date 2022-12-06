import { z } from "zod";
import { router, protectedProcedure } from "../trpc";

export const expenseRouter = router({
  getUserExpenses: protectedProcedure
    .input(
      z.object({
        month: z.number().nullish(),
        year: z.number().nullish(),
        categoryId: z.string().nullish(),
      })
    )
    .query(async ({ input, ctx }) => {
      const userId = ctx.session?.user?.id;
      if (!userId) return null;
      const { year, month, categoryId } = input;
      const dateFilter =
        year && month
          ? {
              gte: new Date(`${year}-${month}-1`),
              lt:
                month === 12
                  ? new Date(`${year + 1}-1-1`)
                  : new Date(`${year}-${month + 1}-1`),
            }
          : {};
      const categoryFilter =
        !categoryId || categoryId === "All categories"
          ? {}
          : {
              equals: categoryId,
            };
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          expenses: {
            include: {
              category: true,
            },
            where: {
              date: dateFilter,
              categoryId: categoryFilter,
            },
          },
        },
      });
      return user?.expenses;
    }),
  create: protectedProcedure
    .input(
      z.object({
        date: z.string(),
        name: z.string(),
        value: z.number(),
        categoryId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { date, name, value, categoryId } = input;
      const userId = ctx.session.user.id;

      const result = await ctx.prisma.expense.create({
        data: { date: new Date(date), name, value, categoryId, userId },
      });

      return {
        status: 201,
        message: "Expense created successfully",
        result: result,
      };
    }),
  edit: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        date: z.date(),
        name: z.string(),
        value: z.number(),
        categoryId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id, date, name, value, categoryId } = input;
      const userId = ctx.session.user.id;

      const result = await ctx.prisma.expense.update({
        data: { date: new Date(date), name, value, categoryId, userId },
        where: { id },
      });

      return {
        status: 201,
        message: "Expense updated successfully",
        result: result,
      };
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id } = input;

      const result = await ctx.prisma.expense.delete({ where: { id } });

      return {
        status: 201,
        message: "Expense deleted successfully",
        result: result,
      };
    }),
});
