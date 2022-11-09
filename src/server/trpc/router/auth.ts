import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import { hash } from "bcryptjs";

export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "You are logged in and can see this secret message!";
  }),
  signup: publicProcedure
    .input(
      z.object({ name: z.string(), email: z.string(), password: z.string() })
    )
    .mutation(async ({ input, ctx }) => {
      const { name, email, password } = input;

      const exists = await ctx.prisma.user.findFirst({
        where: { email },
      });

      if (exists) {
        return {
          status: 403,
          message: "User already exists!",
        };
      }

      const hashedPassword = await hash(password, 12);

      const result = await ctx.prisma.user.create({
        data: { name, email, password: hashedPassword },
      });

      return {
        status: 201,
        message: "User registered successfully",
        result: result.email,
      };
    }),
});
