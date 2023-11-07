"use client";
import { likeComment } from "@/utils/actions";
import { faThumbsUp as faThumbsUpRegular } from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp as faThumbsUpSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC } from "react";

const PokemonLikeButton: FC<{
  commentId: string;
  likes: number;
  userLiked: boolean;
  userLogged: boolean
}> = ({ commentId, likes, userLiked, userLogged }) => {
  const handleClick = async () => {
    if(!userLogged) return
    await likeComment(commentId);
  };
  return (
    <button
      onClick={handleClick} 
      className="text-sm text-gray-600 dark:text-gray-400"
    >
      {userLiked ? (
        <FontAwesomeIcon icon={faThumbsUpSolid} />
      ) : (
        <FontAwesomeIcon icon={faThumbsUpRegular} />
      )}
      {" "}
      {likes}
    </button>
  );
};

export default PokemonLikeButton;
