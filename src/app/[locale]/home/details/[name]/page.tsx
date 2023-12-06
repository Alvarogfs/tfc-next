import PokemonCommentSection from "@/components/pokemon/comments/PokemonCommentSection";
import PokemonDetailCard from "@/components/pokemon/PokemonDetailCard";
import PokemonStatsType from "@/components/pokemon/PokemonStats";
import { getI18n } from "@/locales/server";
import { getPokemon } from "@/utils/api";
import { capitalize, getBorderColor, getColorType } from "@/utils/filters";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FC } from "react";
const Details: FC<{ params: { name: string } }> = async ({ params }) => {
  const t = await getI18n();
  const fetchPokemon = async (term: string) => {
    try {
      const pokemonData = await getPokemon(term);
      return pokemonData;
    } catch (error) {
      return null;
    }
  };
  const pokemon = await fetchPokemon(params.name);
  if (!pokemon || pokemon.id < 1 || pokemon.id > 900) notFound();
  const pokemonBefore = await fetchPokemon(`${pokemon.id - 1}`);
  const pokemonAfter = await fetchPokemon(`${pokemon.id + 1}`);

  return (
    <main className="flex flex-col justify-center container mx-auto gap-4 px-4">
      <section className="flex flex-row">
        {pokemonBefore && pokemonBefore.id >= 1 && (
          <Link className={`p-2 rounded-lg ${getColorType(pokemonBefore.types[0].type.name)}`} href={`/home/details/${pokemonBefore.name}`}>
            <FontAwesomeIcon icon={faArrowLeft} /> #
            {pokemonBefore.id.toLocaleString("es-ES", {
              minimumIntegerDigits: 4,
            })}{" "}
            - {capitalize(pokemonBefore.name)}
          </Link>
        )}
        {pokemonAfter && pokemonAfter.id <= 151 && (
          <Link className={`ms-auto p-2 rounded-lg ${getColorType(pokemonAfter.types[0].type.name)}`} href={`/home/details/${pokemonAfter.name}`}>
            #
            {pokemonAfter.id.toLocaleString("es-ES", {
              minimumIntegerDigits: 4,
            })}{" "}
            - {capitalize(pokemonAfter.name)} <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        )}
      </section>
      <section className="flex flex-col gap-8 md:flex-row items-center md:items-start">
        <div>
          <PokemonDetailCard pokemon={pokemon}></PokemonDetailCard>
        </div>
            <PokemonStatsType pokemon={pokemon}></PokemonStatsType>
      </section>
      <section>
        <PokemonCommentSection pokemonId={pokemon.id.toString()}></PokemonCommentSection>
      </section>
    </main>
  );
};

export default Details;
