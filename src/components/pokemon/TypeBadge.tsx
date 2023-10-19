import { Species } from '@/types/pokemon.types'
import { capitalize, getColorType } from '@/utils/filters'
import React, { FC } from 'react'


const TypeBadge:FC <{pokemonType: Species}> = ({pokemonType}) => {
const color = getColorType(pokemonType.name)
  return (
    <span className={`${color} text-xs font-medium mr-2 px-2.5 py-0.5 rounded`}>{capitalize(pokemonType.name)}</span>
  )
}

export default TypeBadge