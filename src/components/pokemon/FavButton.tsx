'use client'
import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FC } from 'react'

const FavButton:FC<{toggled?: boolean, id: number}> = ({toggled, id}) => {
const togglePokemon = () =>{
    // to do
}
  return (
    <button>
        <FontAwesomeIcon className={`${toggled ? 'text-red-600' : 'text-black'} text-xl`} icon={toggled ? solidHeart : emptyHeart}></FontAwesomeIcon>
    </button>
  )
}

export default FavButton