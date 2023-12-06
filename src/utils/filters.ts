import { Pokemon, PokemonStats, TYPES } from "@/types/pokemon.types";

export const capitalize = (str: string) => {
  return str.charAt(0).toLocaleUpperCase() + str.slice(1);
};
export const getColorType = (pokemonType: string) => {
  const type = pokemonType as (typeof TYPES)[number];
  if (type === "bug") return "bg-lime-500";
  if (type === "dark") return "bg-stone-600";
  if (type === "dragon") return "bg-violet-600";
  if (type === "electric") return "bg-amber-400";
  if (type === "normal") return "bg-stone-400";
  if (type === "fighting") return "bg-red-700";
  if (type === "flying") return "bg-violet-400";
  if (type === "poison") return "bg-fuchsia-700";
  if (type === "grass") return "bg-green-500";
  if (type === "ground") return "bg-yellow-600";
  if (type === "rock") return "bg-yellow-800";
  if (type === "ghost") return "bg-violet-500";
  if (type === "steel") return "bg-slate-300";
  if (type === "fire") return "bg-orange-500";
  if (type === "water") return "bg-blue-400";
  if (type === "psychic") return "bg-pink-400";
  if (type === "ice") return "bg-teal-500";
  if (type === "fairy") return "bg-rose-400";
  if (type === "unknown") return "bg-slate-500";
};
export const getBorderColor = (pokemonType: string) => {
  const type = pokemonType as (typeof TYPES)[number];
  if (type === "bug") return "border-lime-600";
  if (type === "dark") return "border-stone-700";
  if (type === "dragon") return "border-violet-700";
  if (type === "electric") return "border-amber-500";
  if (type === "normal") return "border-stone-500";
  if (type === "fighting") return "border-red-800";
  if (type === "flying") return "border-violet-500";
  if (type === "poison") return "border-fuchsia-800";
  if (type === "grass") return "border-green-600";
  if (type === "ground") return "border-yellow-700";
  if (type === "rock") return "border-yellow-900";
  if (type === "ghost") return "border-violet-600";
  if (type === "steel") return "border-slate-400";
  if (type === "fire") return "border-orange-600";
  if (type === "water") return "border-blue-500";
  if (type === "psychic") return "border-pink-500";
  if (type === "ice") return "border-teal-600";
  if (type === "fairy") return "border-rose-500";
  if (type === "unknown") return "border-slate-600";
};
export const getStats = (pokemon: Pokemon) => {
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
}