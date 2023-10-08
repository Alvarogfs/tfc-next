import { Pokemon, Result } from "@/types/pokemon.types";
import { capitalize } from "@/utils/filters";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import TypeBadge from "./TypeBadge";

const PokemonDetailCard: FC<{ pokemon: Pokemon }> = ({ pokemon }) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Image
        className="rounded-t-lg"
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt={pokemon.name}
        width="475"
        height="475"
      />
      <div className="p-5 flex flex-col">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
          {capitalize(pokemon.name)}
        </h5>
        <div className="flex flex-row justify-center gap-3"> {pokemon.types.map((type) =>  <TypeBadge key={type.slot} pokemonType={type.type}></TypeBadge>) }</div>
      </div>
    </div>
  );
};

export default PokemonDetailCard;
