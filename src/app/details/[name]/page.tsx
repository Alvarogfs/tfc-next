"use client"
import PokemonDetailCard from '@/components/PokemonDetailCard'
import { getByName } from '@/utils/api'
import { useQuery } from '@tanstack/react-query'
import { FC, ReactNode } from 'react'

const Details:FC<{params: {name: string}}> = ({params}) => {
  const {data: pokemon, isLoading, isError} = useQuery({
    queryKey: [`pokemon-${params.name}`],
    queryFn: () => getByName(params.name)
  })
  if(isLoading){
    return <div>loading</div>
  }
  if(!pokemon){
    return null
  }
  return (
    <main className='flex flex-col justify-center'>
      <div className='flex flex-row'>
        <div><PokemonDetailCard pokemon={pokemon}></PokemonDetailCard></div>
        <div></div>
      </div>
    </main>
  )
}

export default Details