import { User } from "next-auth";

export type Room = {id: string, users: User[]}