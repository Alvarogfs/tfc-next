import { Pokemon } from "@/types/pokemon.types";
import { capitalize, getBorderColor, getColorType } from "@/utils/filters";
import Image from "next/image";
import React, { FC } from "react";
import TypeBadge from "./TypeBadge";

const PokemonDetailCard: FC<{ pokemon: Pokemon }> = ({ pokemon }) => {
const mainColor = getColorType(pokemon.types[0].type.name)
const borderColor = getBorderColor(pokemon.types[0].type.name)
  return (
    <div className={`max-w-sm ${mainColor} border-4 ${borderColor} rounded-lg shadow p-2 flex flex-col gap-2 pb-4`}>
      <div className="flex flex-row gap-2">
        <div className="bg-white rounded-lg flex-grow">
        <h5 className="p-2 text-2xl font-bold tracking-tight text-gray-900 text-center">
          {capitalize(pokemon.name)}
        </h5>
        </div>
        <div className="bg-white rounded-lg">
        <h5 className="p-2 text-2xl font-bold tracking-tight text-gray-900 text-center">
          #{ pokemon.id.toLocaleString("es-ES", { minimumIntegerDigits: 4 }) }
        </h5>
        </div>
      </div>
      <Image
        className="rounded-t-lg bg-white rounded-lg"
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt={pokemon.name}
        width="475"
        height="475"
      />
      <div className="flex flex-col">
        <h5 className="text-center font-bold">Types</h5>
        <div className="flex flex-row justify-center gap-3 bg-white rounded-lg p-2"> {pokemon.types.map((type) =>  <TypeBadge key={type.slot} pokemonType={type.type}></TypeBadge>) }</div>
      </div>
    </div>
  );
};

export default PokemonDetailCard;
