import React, { FC } from 'react'
import PokemonComment from './PokemonComment'
import prisma from '../../../../prisma/prisma'
import PokemonCommentForm from './PokemonCommentForm'

const PokemonCommentSection:FC<{pokemonId: string}> = async({pokemonId}) => {
    const comments = await prisma.pokemonComment.findMany({
        where: {
            pokemonId
        },
        include:{
          author: true,
          _count: {
            select: {
              likes: true
            }
          }
        }
    })
  return (
    <section className="py-8 lg:py-16 antialiased">
  <div className="max-w-2xl mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Comments: {comments.length}</h2>
    </div>
  <PokemonCommentForm pokemonId={pokemonId}></PokemonCommentForm>
    {comments.length>0 ? comments.map((el) => {
        return <PokemonComment key={el.id} comment={el} author={el.author} likes={el._count.likes}></PokemonComment>
    }) : <h3 className='dark:text-white text-black text-2xl text-center py-12'>No comments</h3>}
  </div>
</section>
  )
}

export default PokemonCommentSection