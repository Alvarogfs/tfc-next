import { Session as NextAuthSession, User as NextAuthUser } from "next-auth";

declare module "next-auth" {

  export interface User extends NextAuthUser {
    id: string;
    roles: string[];
  }

  export interface Session extends NextAuthSession {
    user: User;
  }
}