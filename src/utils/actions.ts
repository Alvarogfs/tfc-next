"use server";
import { revalidatePath } from "next/cache";
import prisma from "../../prisma/prisma";
import { auth } from "./auth";
import bcrypt from "bcrypt";
import { put } from "@vercel/blob";
import axios from "axios";
import { wsApi } from "./api";


export const toggleFavourite = async (pokemonId: string) => {
  const session = await auth();
  if (!session?.user.id) {
    throw new Error("No user detected");
  }
  const favourited = await prisma.pokemonFavouriteUser.findUnique({
    where: {
      pokemonId_userId: {
        pokemonId,
        userId: session.user.id,
      },
    },
  });
  if (favourited) {
    await prisma.pokemonFavouriteUser.delete({
      where: {
        pokemonId_userId: favourited,
      },
    });
  } else {
    await prisma.pokemonFavouriteUser.create({
      data: {
        pokemonId,
        userId: session.user.id,
      },
    });
  }
  revalidatePath("/home/details/[name]");
};
export const postComment = async (pokemonId: string, comment: string) => {
  const session = await auth();
  if (!session?.user.id) {
    throw new Error("No user detected");
  }
  await prisma.pokemonComment.create({
    data: {
      comment,
      pokemonId,
      authorId: session.user.id,
    },
  });
  revalidatePath("/home/details/[name]");
};
export const likeComment = async (commentId: string) => {
  const session = await auth();
  if (!session?.user.id) {
    throw new Error("No user detected");
  }
  const liked = await prisma.pokemonCommentLike.findUnique({
    where: {
      userId_commentId: {
        commentId,
        userId: session.user.id,
      },
    },
  });
  if (liked) {
    await prisma.pokemonCommentLike.delete({
      where: {
        userId_commentId: liked,
      },
    });
  } else {
    await prisma.pokemonCommentLike.create({
      data: {
        commentId,
        userId: session.user.id,
      },
    });
  }
  revalidatePath("/home/details/[name]");
};
export const registerUser = async (
  email: string,
  name: string,
  password: string
) => {
  const existingUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (existingUser) throw new Error("exists");
  const hashPassword = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashPassword,
    },
  });
};
export const editUser = async (name: string, image?: {content: string, name: string}) => {
  const session = await auth();
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: session?.user.id,
      },
    });
    const base64Blob = image ? await (await fetch(image.content)).blob() :  null
    const { url } = image && base64Blob ? await put(`images/user/${image.name}`, base64Blob, { access: 'public' }) : {url: null};
    const newUser = await prisma.user.update({
      where: {
        id: session?.user.id,
      },
      data: {
        name,
        image: url ?? user.image
      },
    });
    revalidatePath('/home', 'layout');
    return {name: newUser.name, image: newUser.image}
  } catch (error) {
    console.error(error);
  }
};