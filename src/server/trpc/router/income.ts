import { z } from "zod";
import { router, protectedProcedure } from "../trpc";

export const incomeRouter = router({
  getUserIncome: protectedProcedure
    .input(
      z.object({
        year: z.number(),
        categoryId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const userId = ctx.session?.user?.id;
      if (!userId) return null;
      const { year, categoryId } = input;
      const firstDayOfYear = new Date(`${year}-1-1`);
      const firstDayOfNextYear = new Date(`${year + 1}-1-1`);
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          incomes: {
            include: {
              category: true,
            },
            where: {
              date: {
                gte: firstDayOfYear,
                lt: firstDayOfNextYear,
              },
              categoryId:
                categoryId === "All categories"
                  ? {}
                  : {
                      equals: categoryId,
                    },
            },
          },
        },
      });
      return user?.incomes;
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

      const result = await ctx.prisma.income.create({
        data: { date: new Date(date), name, value, categoryId, userId },
      });

      return {
        status: 201,
        message: "Income created successfully",
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

      const result = await ctx.prisma.income.update({
        data: { date: new Date(date), name, value, categoryId, userId },
        where: { id },
      });

      return {
        status: 201,
        message: "Income updated successfully",
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

      const result = await ctx.prisma.income.delete({ where: { id } });

      return {
        status: 201,
        message: "Income deleted successfully",
        result: result,
      };
    }),
});
