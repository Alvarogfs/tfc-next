"use server"
import prisma from "../../prisma/prisma"
import { auth } from "./auth"

export const toggleFavourite = async (pokemonId: string) =>{
    const session = await auth()
    if(!session?.user.id){
        throw new Error("No user detected")
    }
    const favourited = await prisma.pokemonFavouriteUser.findUnique({
        where: {
            pokemonId_userId: {
                pokemonId,
                userId: session.user.id
            }
        }
    })
    if(favourited){
        await prisma.pokemonFavouriteUser.delete({
            where: {
                pokemonId_userId: favourited
            }
        })
    }else {
        await prisma.pokemonFavouriteUser.create({
            data: {
                pokemonId,
                userId: session.user.id
            }
        })
    }
}