import PokemonCommentSection from "@/components/pokemon/comments/PokemonCommentSection";
import PokemonDetailCard from "@/components/pokemon/PokemonDetailCard";
import { PokemonStats } from "@/types/pokemon.types";
import { getPokemon } from "@/utils/api";
import { capitalize, getBorderColor, getColorType } from "@/utils/filters";
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
  if (!pokemon || pokemon.id < 1 || pokemon.id > 900) notFound();
  const pokemonBefore = await fetchPokemon(`${pokemon.id - 1}`);
  const pokemonAfter = await fetchPokemon(`${pokemon.id + 1}`);
  const stats =( () => {
    const hp =  pokemon.stats.find(stat => {
      return stat.stat.name === "hp"
    })?.base_stat;
    const attack =  pokemon.stats.find(stat => {
      return stat.stat.name === "attack"
    })?.base_stat;
    const defense =  pokemon.stats.find(stat => {
      return stat.stat.name === "defense"
    })?.base_stat;
    const special_attack =  pokemon.stats.find(stat => {
      return stat.stat.name === "special-attack"
    })?.base_stat;
    const special_defense =  pokemon.stats.find(stat => {
      return stat.stat.name === "special-defense"
    })?.base_stat;
    const speed =  pokemon.stats.find(stat => {
      return stat.stat.name === "speed"
    })?.base_stat;
    return {hp, attack, defense, special_attack, special_defense, speed} as PokemonStats
  })()
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
        <div className={`${getColorType(pokemon.types[0].type.name)} flex flex-col items-center px-2 rounded-lg pb-2 border-4 ${getBorderColor(pokemon.types[0].type.name)}`}>
          <h5 className={`font-bold border-b-2 w-full text-center ${getBorderColor(pokemon.types[0].type.name)} my-1`}>Stats</h5>
        <table className={`w-96 text-left h-[288px] border-spacing-x-0 border-spacing-y-0.5 border-separate`}>
          <tbody>
          <tr className="bg-red-500">
            <th className="w-32 px-2"><div className="flex flex-row justify-between w-full"><span>Health: </span><span>{stats.hp}</span></div></th>
            <td><div style={{width: `${stats.hp*100/255}%`}} className={`bg-red-600 h-full border-2 border-red-700`}></div></td>
          </tr>
          <tr className="bg-orange-400">
          <th className="w-32 px-2"><div className="flex flex-row justify-between w-full"><span>Attack: </span><span>{stats.attack}</span></div></th>
            <td><div style={{width: `${stats.attack*100/255}%`}} className={`bg-orange-500 h-full border-2 border-orange-600`}></div></td>
          </tr>
          <tr className="bg-amber-300">
          <th className="w-32 px-2"><div className="flex flex-row justify-between w-full"><span>Defense: </span><span>{stats.defense}</span></div></th>
            <td><div style={{width: `${stats.defense*100/255}%`}} className={`bg-amber-400 h-full border-2 border-amber-500`}></div></td>
          </tr>
          <tr className="bg-blue-300">
          <th className="w-32 px-2"><div className="flex flex-row justify-between w-full"><span>SP Atk: </span><span>{stats.special_attack}</span></div></th>
            <td><div style={{width: `${stats.special_attack*100/255}%`}} className={`bg-blue-400 h-full border-2 border-blue-500`}></div></td>
          </tr>
          <tr className="bg-green-600">
          <th className="w-32 px-2"><div className="flex flex-row justify-between w-full"><span>SP Def: </span><span>{stats.special_defense}</span></div></th>
            <td><div style={{width: `${stats.special_defense*100/255}%`}} className={`bg-green-700 h-full border-2 border-green-800`}></div></td>
          </tr>
          <tr className="bg-rose-300">
          <th className="w-32 px-2"><div className="flex flex-row justify-between w-full"><span>Speed: </span><span>{stats.speed}</span></div></th>
            <td><div style={{width: `${stats.speed*100/255}%`}} className={`bg-rose-400 h-full border-2 border-rose-500`}></div></td>
          </tr>
          <tr className="bg-purple-300">
          <th className="w-32 px-2"><div className="flex flex-row justify-between w-full"><span>Total: </span><span>{stats.hp+stats.attack+stats.defense+stats.special_attack+stats.special_defense+stats.speed}</span></div></th>
            <td><div style={{width: `${(stats.hp+stats.attack+stats.defense+stats.special_attack+stats.special_defense+stats.speed)*100/1530}%`}} className={`bg-purple-400 h-full border-2 border-purple-500`}></div></td>
          </tr>
          </tbody>
        </table>
        </div>
      </section>
      <section>
        <PokemonCommentSection pokemonId={pokemon.id.toString()}></PokemonCommentSection>
      </section>
    </main>
  );
};

export default Details;
