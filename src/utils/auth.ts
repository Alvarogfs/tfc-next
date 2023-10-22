import { PrismaAdapter } from "@auth/prisma-adapter";
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import prisma from "../../prisma/prisma";
const GITHUB_ID = process.env.GITHUB_ID as string;
const GITHUB_SECRET = process.env.GITHUB_SECRET as string;

export const config = {
  session: {
    strategy: "jwt"
  },
  callbacks: {
    session({session, token}) {
      if(session?.user){
        // @ts-ignore
        session.user.id = token?.sub
      }
      return session
    },
  },
  // @ts-ignore
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: GITHUB_ID,
      clientSecret: GITHUB_SECRET,
    }),
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
