import { config } from "@/utils/auth"
import NextAuth, { User } from "next-auth"
// @ts-ignore
const handler = NextAuth(config)
interface ExtendedUser extends User {
  id: string;
  roles: string[];
}

export { handler as GET, handler as POST }