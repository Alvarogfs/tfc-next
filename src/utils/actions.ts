"use server"
import prisma from "../../prisma/prisma"
import { auth } from "./auth"
import bcrypt from "bcrypt"

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
export const postComment = async (pokemonId: string, comment: string)=>{
    const session = await auth()
    if(!session?.user.id){
        throw new Error("No user detected")
    }
    await prisma.pokemonComment.create({
        data: {
            comment,
            pokemonId,
            authorId: session.user.id
        }
    })
}
export const likeComment = async (commentId: string)=>{
    const session = await auth()
    if(!session?.user.id){
        throw new Error("No user detected")
    }
    const liked = await prisma.pokemonCommentLike.findUnique({
        where: {
            userId_commentId: {
                commentId,
                userId: session.user.id
            }
        }
    })
    if(liked){
        await prisma.pokemonCommentLike.delete({
            where: {
                userId_commentId: liked
            }
        })
    }else {
        await prisma.pokemonCommentLike.create({
            data: {
                commentId,
                userId: session.user.id
            }
        })
    }
}
export const registerUser = async(email: string, name: string, password: string)=>{
    const existingUser = await prisma.user.findFirst({
        where: {
            email
        }
    })
    if(existingUser) throw new Error("exists")
    const hashPassword = await bcrypt.hash(password, 10)
    await prisma.user.create({
        data: {
            name,
            email,
            password: hashPassword
        }
    })
}