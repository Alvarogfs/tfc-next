"use client"
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
  return (
    <div>{pokemon?.id} - {pokemon?.name}</div>
  )
}

export default Details