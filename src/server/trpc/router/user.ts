import { z } from "zod";
import { prisma } from "../../db/client";
import { router, protectedProcedure } from "../trpc";

export const userRouter = router({
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
});
