import { Result } from '@/types/pokemon.types'
import { capitalize } from '@/utils/filters'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'

const PokemonCard:FC<{pokemon: Result}> = ({pokemon}) => {

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <Link href={`details/${pokemon.name}`}>
        <Image className="rounded-t-lg" src={pokemon.url} alt={pokemon.name} width="475" height="475"/>
    </Link>
    <div className="p-5">
        <Link href={`details/${pokemon.name}`}>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">{capitalize(pokemon.name)}</h5>
        </Link>
    </div>
    </div>
  )
}

export default PokemonCard