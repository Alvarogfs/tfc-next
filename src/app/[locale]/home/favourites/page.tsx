import { auth } from '@/utils/auth'
import { redirect } from 'next/navigation'
import React from 'react'
import prisma from '../../../../../prisma/prisma'
import PokemonCard from '@/components/pokemon/PokemonCard'
import { getPokemon } from '@/utils/api'

const FavPage = async() => {
  const session = await auth()
  if(!session?.user.id){
    redirect("/")
  }
  const favouritesPokemons = await prisma.pokemonFavouriteUser.findMany({
    where: {
        userId: session.user.id
    }
  })
  const formatedPokemons = await Promise.all
   (favouritesPokemons.map(async(el) => {
    const pokemon = await getPokemon(el.pokemonId)
    return pokemon
  }))
  return (
    <main>
    <div className="grid xl:grid-cols-6 gap-6 mx-8 sm:grid-cols-1 justify-center items-center md:grid-cols-3 my-7">
      {formatedPokemons?.map((el) => (
        <PokemonCard key={el.id} pokemon={{
            name: el.name,
            url: el.sprites.other['official-artwork'].front_default
        }}></PokemonCard>
      ))}
    </div>
  </main>
  )
}

export default FavPage