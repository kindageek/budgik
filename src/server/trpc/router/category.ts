import { prisma } from "../../db/client";
import { router, publicProcedure } from "../trpc";

export const categoryRouter = router({
  getAll: publicProcedure.query(async () => {
    return await prisma.category.findMany();
  }),
});
