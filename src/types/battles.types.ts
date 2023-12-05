import { User } from "next-auth";
import { Pokemon } from "./pokemon.types";

export type Player = User & {pokemon: Pokemon}

export type Room = {id: string, users: Player[]}

const BATTLE_STATUS = ["pending", "ready", "choosing", "chosen", "battling","won", "lost", "finished"] as const
export type BattleStatus = typeof BATTLE_STATUS[number]