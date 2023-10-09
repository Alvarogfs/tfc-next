import PokemonDetailCard from "@/components/PokemonDetailCard";
import { getPokemon } from "@/utils/api";
import { capitalize, getColorType } from "@/utils/filters";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FC } from "react";
const Details: FC<{ params: { name: string } }> = async ({ params }) => {
  const fetchPokemon = async (term: string) => {
    try {
      const pokemonData = await getPokemon(term);
      return pokemonData;
    } catch (error) {
      return null;
    }
  };
  const pokemon = await fetchPokemon(params.name);
  if (!pokemon || pokemon.id < 1 || pokemon.id > 151) notFound();
  const pokemonBefore = await fetchPokemon(`${pokemon.id - 1}`);
  const pokemonAfter = await fetchPokemon(`${pokemon.id + 1}`);
  return (
    <main className="flex flex-col justify-center container mx-auto gap-4">
      <div className="flex flex-row">
        {pokemonBefore && pokemonBefore.id >= 1 && (
          <Link className={`p-2 rounded-lg ${await getColorType(pokemonBefore.types[0].type.name)}`} href={`/details/${pokemonBefore.name}`}>
            <FontAwesomeIcon icon={faArrowLeft} /> #
            {pokemonBefore.id.toLocaleString("es-ES", {
              minimumIntegerDigits: 4,
            })}{" "}
            - {capitalize(pokemonBefore.name)}
          </Link>
        )}
        {pokemonAfter && pokemonAfter.id <= 151 && (
          <Link className={`ms-auto p-2 rounded-lg ${await getColorType(pokemonAfter.types[0].type.name)}`} href={`/details/${pokemonAfter.name}`}>
            #
            {pokemonAfter.id.toLocaleString("es-ES", {
              minimumIntegerDigits: 4,
            })}{" "}
            - {capitalize(pokemonAfter.name)} <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        )}
      </div>
      <div className="flex flex-row">
        <div>
          <PokemonDetailCard pokemon={pokemon}></PokemonDetailCard>
        </div>
        <div></div>
      </div>
    </main>
  );
};

export default Details;
