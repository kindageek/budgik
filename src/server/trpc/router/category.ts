import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const categoryRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.category.findMany();
  }),
  getExpenseCategories: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.category.findMany({ where: { type: "EXPENSE" } });
  }),
  getIncomeCategories: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.category.findMany({ where: { type: "INCOME" } });
  }),
  add: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { name } = input;

      const result = await ctx.prisma.category.create({
        data: { name },
      });

      return {
        status: 201,
        message: "Category created successfully",
        result: result,
      };
    }),
  edit: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id, name } = input;

      const result = await ctx.prisma.category.update({
        data: { name },
        where: { id },
      });

      return {
        status: 201,
        message: "Category updated successfully",
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

      const result = await ctx.prisma.category.delete({ where: { id } });

      return {
        status: 201,
        message: "Category deleted successfully",
        result: result,
      };
    }),
});
