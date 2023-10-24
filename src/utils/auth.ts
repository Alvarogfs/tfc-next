import { PrismaAdapter } from "@auth/prisma-adapter";
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../prisma/prisma";
const GITHUB_ID = process.env.GITHUB_ID as string;
const GITHUB_SECRET = process.env.GITHUB_SECRET as string;

export const config = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session({ session, token }) {
      if (session?.user) {
        // @ts-ignore
        session.user.id = token?.sub;
      }
      return session;
    },
  },
  // @ts-ignore
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const authResponse = await fetch("/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });

        if (!authResponse.ok) {
          return null;
        }

        const user = await authResponse.json();

        return user;
      },
    }),
    GitHubProvider({
      clientId: GITHUB_ID,
      clientSecret: GITHUB_SECRET,
    })

  ],
} satisfies NextAuthOptions;

export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  // @ts-ignore
  return getServerSession(...args, config);
}
