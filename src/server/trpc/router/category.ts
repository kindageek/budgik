import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const categoryRouter = router({
  getAll: publicProcedure
    .input(
      z.object({
        type: z.enum(["EXPENSE", "INCOME"]),
      })
    )
    .query(async ({ input, ctx }) => {
      const userId = ctx.session?.user?.id;
      if (!userId) return null;
      return await ctx.prisma.category.findMany({
        where: {
          type: input.type,
          userId,
        },
      });
    }),
  getExpenseCategories: publicProcedure
    .input(
      z.object({
        includeExpenseData: z.boolean().default(false),
      })
    )
    .query(async ({ input, ctx }) => {
      const userId = ctx.session?.user?.id;
      if (!userId) return null;
      return await ctx.prisma.category.findMany({
        where: { type: "EXPENSE", userId },
        include: {
          expenses: input.includeExpenseData,
        },
      });
    }),
  getIncomeCategories: publicProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user?.id;
    if (!userId) return null;
    return await ctx.prisma.category.findMany({
      where: { type: "INCOME", userId },
    });
  }),
  add: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        type: z.enum(["EXPENSE", "INCOME"]),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { name, type } = input;
      const userId = ctx.session.user.id;
      const existingCount = await ctx.prisma.category.count({
        where: { name, type },
      });

      if (existingCount !== 0) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Category already exists!",
        });
      }

      const result = await ctx.prisma.category.create({
        data: { name, type, userId },
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
        type: z.enum(["EXPENSE", "INCOME"]),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id, name, type } = input;

      const result = await ctx.prisma.category.update({
        data: { name, type },
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
