import PokemonCommentSection from "@/components/pokemon/comments/PokemonCommentSection";
import PokemonDetailCard from "@/components/pokemon/PokemonDetailCard";
import PokemonStatsType from "@/components/pokemon/PokemonStats";
import { getI18n } from "@/locales/server";
import { getPokemon } from "@/utils/api";
import { capitalize, getColorType } from "@/utils/filters";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FC } from "react";
const Details: FC<{ params: { name: string } }> = async ({ params }) => {
  const t = await getI18n();
  const pokemon = await fetchPokemon(params.name);
  if (!pokemon || pokemon.id < 1 || pokemon.id > 151) redirect("/404");
  const pokemonBefore = await fetchPokemon(`${pokemon.id - 1}`);
  const pokemonAfter = await fetchPokemon(`${pokemon.id + 1}`);

  return (
    <main className="flex flex-col justify-center container mx-auto gap-4 px-4">
      <section className="flex flex-row">
        {pokemonBefore && pokemonBefore.id >= 1 && (
          <Link
            className={`p-2 rounded-lg ${getColorType(
              pokemonBefore.types[0].type.name
            )}`}
            href={`/home/details/${pokemonBefore.name}`}
          >
            <FontAwesomeIcon icon={faArrowLeft} /> #
            {pokemonBefore.id.toLocaleString("es-ES", {
              minimumIntegerDigits: 4,
            })}{" "}
            - {capitalize(pokemonBefore.name)}
          </Link>
        )}
        {pokemonAfter && pokemonAfter.id <= 151 && (
          <Link
            className={`ms-auto p-2 rounded-lg ${getColorType(
              pokemonAfter.types[0].type.name
            )}`}
            href={`/home/details/${pokemonAfter.name}`}
          >
            #
            {pokemonAfter.id.toLocaleString("es-ES", {
              minimumIntegerDigits: 4,
            })}{" "}
            - {capitalize(pokemonAfter.name)}{" "}
            <FontAwesomeIcon icon={faArrowRight} />
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
        <PokemonCommentSection
          pokemonId={pokemon.id.toString()}
        ></PokemonCommentSection>
      </section>
    </main>
  );
};
export async function generateMetadata(
  { params }: { params: { name: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const name = params.name;

  // fetch data
  const pokemon = await fetchPokemon(name);
  if(!pokemon) redirect("/404")
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${capitalize(pokemon.name)} tfc-next`,
    openGraph: {
      images: [pokemon.sprites.front_default, ...previousImages],
    },
  };
}

const fetchPokemon = async (term: string) => {
  try {
    const pokemonData = await getPokemon(term);
    return pokemonData;
  } catch (error) {
    return null;
  }
};
export default Details;
