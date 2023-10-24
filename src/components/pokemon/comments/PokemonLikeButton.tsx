"use client"
import { likeComment } from '@/utils/actions'
import { useRouter } from 'next/navigation'
import React, { FC } from 'react'

const PokemonLikeButton:FC<{commentId: string, likes: number}> = ({commentId, likes}) => {
    const router = useRouter()
    const handleClick = async () =>{
        await likeComment(commentId)
        router.refresh()
    }
  return (
    <button onClick={handleClick} className="text-sm text-gray-600 dark:text-gray-400">+{likes}</button>
  )
}

export default PokemonLikeButton