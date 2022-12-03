import { z } from "zod";
import { router, protectedProcedure } from "../trpc";

export const expenseRouter = router({
  getUserExpenses: protectedProcedure
    .input(
      z.object({
        month: z.number(),
        year: z.number(),
      })
    )
    .query(async ({ input, ctx }) => {
      const userId = ctx.session?.user?.id;
      if (!userId) return null;
      const firstDayOfMonth = new Date(`${input.year}-${input.month}-1`);
      const firstDayOfNextMonth = input.month === 12 ? new Date(
        `${input.year + 1}-1-1`
      ) : new Date(
        `${input.year}-${input.month + 1}-1`
      );
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
              date: {
                gte: firstDayOfMonth,
                lt: firstDayOfNextMonth,
              },
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
