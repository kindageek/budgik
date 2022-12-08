import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { router, protectedProcedure } from "../trpc";

export const userRouter = router({
  getYears: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user?.id;
    if (!userId) return null;
    const user = await ctx.prisma.user.findFirst({ where: { id: userId } });
    return user?.years || [];
  }),
  addYears: protectedProcedure
    .input(
      z.object({
        years: z.array(z.number()),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { years } = input;
      const userId = ctx.session.user.id;
      const user = await ctx.prisma.user.findFirst({ where: { id: userId } });
      const userYears = user?.years || [];

      if (years.filter((year) => userYears.includes(year)).length > 0) {
        throw new TRPCError({
          code: "CONFLICT",
          message: `Year already exists!`,
        });
      }

      const newYears = userYears.concat(years);

      const result = await ctx.prisma.user.update({
        data: { years: newYears },
        where: { id: userId },
      });

      return {
        status: 201,
        message: "Year added successfully",
        result: result,
      };
    }),
});
