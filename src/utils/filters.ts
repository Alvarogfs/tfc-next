import { TYPES } from "@/types/pokemon.types"

export const capitalize = (str: string) => {
    return str.charAt(0).toLocaleUpperCase()+str.slice(1)
}
export const getColorType = (pokemonType: string) =>{
    const type = pokemonType as typeof TYPES[number]
    if(type==="bug") return "bg-lime-500"
    if(type==="dark") return "bg-stone-600"
    if(type==="dragon") return "bg-violet-600"
    if(type==="electric") return "bg-amber-400"
    if(type==="normal") return "bg-stone-400"
    if(type==="fighting") return "bg-red-700"
    if(type==="flying") return "bg-violet-400"
    if(type==="poison") return "bg-fuchsia-700"
    if(type==="grass") return "bg-green-500"
    if(type==="ground") return "bg-yellow-600"
    if(type==="rock") return "bg-yellow-800"
    if(type==="ghost") return "bg-violet-500"
    if(type==="steel") return "bg-slate-300"
    if(type==="fire") return "bg-orange-500"
    if(type==="water") return "bg-blue-400"
    if(type==="psychic") return "bg-pink-400"
    if(type==="ice") return "bg-teal-500"
    if(type==="fairy") return "bg-rose-400"
    if(type==="unknown") return "bg-slate-500"
}