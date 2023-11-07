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
import bcrypt from "bcrypt";
import { User } from "@prisma/client";
const GITHUB_ID = process.env.GITHUB_ID as string;
const GITHUB_SECRET = process.env.GITHUB_SECRET as string;

export const config = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login"
  },
  callbacks: {
    session({ session, token }) {
      if (session?.user) {
        // @ts-ignore
        session.user.id = token?.sub;
      }
      return session;
    },
    jwt({token, trigger, session}){
      if(trigger === 'update'){
        token.name = session.name
        token.picture = session.image
      }
      return token
    }
  },
  // @ts-ignore
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // @ts-ignore
      async authorize(credentials) {
        try {
          const user = await prisma.user.findUniqueOrThrow({
            where: {
              email: credentials?.email,
            },
          });
          if (!(await bcrypt.compare(credentials?.password!, user.password!)))
            return null;
          return { id: user.id, name: user.name, email: user.email, image: user.image };
        } catch (error) {
          return null
        }
      },
    }),
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
