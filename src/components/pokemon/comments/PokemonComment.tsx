import { PokemonComment, User } from "@prisma/client";
import React, { FC } from "react";
import Image from "next/image";
import { likeComment } from "@/utils/actions";
import PokemonLikeButton from "./PokemonLikeButton";
import { auth } from "@/utils/auth";

const PokemonComment: FC<{
  comment: PokemonComment;
  author: User;
  likes: number;
  userLiked: boolean
}> = async({ comment, author, likes, userLiked }) => {
  const session = await auth()
  return (
    <article className="p-6 text-base ">
      <footer className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
            {author?.image && (
              <Image
                width={24}
                height={24}
                className="mr-2 w-6 h-6 rounded-full"
                src={author.image}
                alt={author.name ?? author.email ?? author.id}
              />
            )}
            {author.name ?? author.email ?? author.id}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {comment.createdAt.toDateString()}
          </p>
        </div>
      </footer>
      <p className="text-gray-500 dark:text-gray-400">{comment.comment}</p>
      <PokemonLikeButton userLiked={userLiked} commentId={comment.id} likes={likes} userLogged={!!session?.user}></PokemonLikeButton>
    </article>
  );
};

export default PokemonComment;
