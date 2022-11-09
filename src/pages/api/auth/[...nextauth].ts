import NextAuth, { type NextAuthOptions } from "next-auth";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsContainer from "next-auth/providers/credentials";

import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";
import { compare } from "bcryptjs";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  pages: { signIn: "/auth/signin" },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsContainer({
      credentials: {
        email: {
          type: "email",
          id: "email",
        },
        password: {
          type: "password",
          id: "password",
        },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await prisma.user.findFirst({
          where: { email: credentials?.email },
        });

        if (user) {
          const checkPassword =
            user.password &&
            (await compare(credentials.password, user.password));
          if (!checkPassword || user.email !== credentials.email) {
            throw new Error("Email or password does not match!");
          }
          return user;
        } else {
          throw new Error("User not found!");
        }
      },
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
