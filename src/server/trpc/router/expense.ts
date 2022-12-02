import { z } from "zod";
import { prisma } from "../../db/client";
import { router, protectedProcedure } from "../trpc";

export const expenseRouter = router({
  getUserExpenses: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user?.id;
    if (!userId) return null;
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        expenses: {
          include: {
            category: true,
          },
        },
      },
    });
    return user?.expenses;
  }),
  createExpense: protectedProcedure
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
  editExpense: protectedProcedure
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
  deleteExpense: protectedProcedure
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
