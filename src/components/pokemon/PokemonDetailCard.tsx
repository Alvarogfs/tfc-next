import { Pokemon } from "@/types/pokemon.types";
import { capitalize, getBorderColor, getColorType } from "@/utils/filters";
import Image from "next/image";
import React, { FC } from "react";
import TypeBadge from "./TypeBadge";
import FavButton from "./FavButton";
import prisma from "../../../prisma/prisma";
import { auth } from "@/utils/auth";
import { getI18n } from "@/locales/server";

const PokemonDetailCard: FC<{ pokemon: Pokemon }> = async ({ pokemon }) => {
  const mainColor = getColorType(pokemon.types[0].type.name);
  const borderColor = getBorderColor(pokemon.types[0].type.name);
  const session = await auth();
  const t = await getI18n();
  const isFavourited = session?.user?.id
    ? await prisma.pokemonFavouriteUser.findUnique({
        where: {
          pokemonId_userId: {
            pokemonId: pokemon.id.toString(),
            userId: session?.user?.id,
          },
        },
      })
    : false;
  return (
    <section
      className={`max-w-sm ${mainColor} border-4 ${borderColor} rounded-lg shadow p-2 flex flex-col gap-2 pb-4`}
    >
      <div className="flex flex-row gap-2">
        {session && (
          <div className="bg-white rounded-lg flex items-center px-2">
            <FavButton toggled={!!isFavourited} id={pokemon.id}></FavButton>
          </div>
        )}
        <div className="bg-white rounded-lg flex-grow">
          <h5 className="p-2 text-2xl font-bold tracking-tight text-gray-900 text-center">
            {capitalize(pokemon.name)}
          </h5>
        </div>
        <div className="bg-white rounded-lg">
          <h5 className="p-2 text-2xl font-bold tracking-tight text-gray-900 text-center">
            #{pokemon.id.toLocaleString("es-ES", { minimumIntegerDigits: 4 })}
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
        <h5 className="text-center font-bold">{t("pokemonDetail.types")}</h5>
        <div className="flex flex-row justify-center gap-3 bg-white rounded-lg p-2">
          {" "}
          {pokemon.types.map((type) => (
            <TypeBadge key={type.slot} pokemonType={type.type}></TypeBadge>
          ))}
        </div>
      </div>
      <div className="flex flex-row justify-evenly gap-2 text-center">
        <div className="w-full">
          <h5 className="text-center font-bold">{t("pokemonDetail.height")}</h5>
          <div className="bg-white rounded-lg p-2">
            {(pokemon.height / 10).toLocaleString("es-ES", {
              minimumFractionDigits: 1,
            })}{" "}
            m
          </div>
        </div>
        <div className="w-full">
          <h5 className="text-center font-bold">{t("pokemonDetail.weight")}</h5>
          <div className="bg-white rounded-lg p-2">
            {(pokemon.weight / 10).toLocaleString("es-ES", {
              minimumFractionDigits: 1,
            })}{" "}
            kg
          </div>
        </div>
      </div>
    </section>
  );
};

export default PokemonDetailCard;
