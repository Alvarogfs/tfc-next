import { auth } from "@/utils/auth";
import { redirect } from "next/navigation";
import React from "react";
import prisma from "../../../../../prisma/prisma";
import { getPokemon } from "@/utils/api";
import Image from "next/image";
import Link from "next/link";
const FavPage = async () => {
  const session = await auth();
  if (!session?.user.id) {
    redirect("/");
  }
  const favouritesPokemons = await prisma.pokemonFavouriteUser.findMany({
    where: {
      userId: session.user.id,
    },
  });
  const formatedPokemons = await Promise.all(
    favouritesPokemons.map(async (el) => {
      const pokemon = await getPokemon(el.pokemonId);
      return pokemon;
    })
  );
  return (
    <main>
      <div
        style={{
          backgroundImage: "url(/img/box_background.png)",
          backgroundRepeat: "repeat",
          imageRendering: "pixelated",
        }}
        className="grid xl:grid-cols-8 gap-6 mx-8 sm:grid-cols-1 justify-center items-center md:grid-cols-3 my-7 border-4 rounded border-orange-800"
      >
        {formatedPokemons?.map((el) => (
          <Link
          key={el.id}
          href={`/home/details/${el.name}`}
          >
          <Image
            className="w-[120px] h-[90px] hover:-translate-y-1 transition"
            quality={100}
            src={el.sprites.versions?.["generation-vii"].icons.front_default!}
            alt={el.name}
            width={40}
            height={30}
          ></Image>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default FavPage;
