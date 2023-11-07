import { Room } from "@/types/battles.types";
import { Pokedex, Pokemon } from "@/types/pokemon.types";
import axios from "axios";

const api = axios.create({
    baseURL: "https://pokeapi.co/api/v2/",
})

export const getList = async (limit: number) => {
    const response = await api.get<Pokedex>("pokemon", {
        params : {
            limit,
            offset: 0
        }
    })
    return response.data.results.map((el, index)=> ({...el, url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index+1}.png`}))
}
export const getPokemon = async (name: string) =>{
    const response = await api.get<Pokemon>(`pokemon/${name}`)
    return response.data
}
export const wsApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SOCKET_URL
})
export const getRooms = async() =>{
    console.log(process.env.SOCKET_URL)
    const response = await wsApi.get<Room[]>('/rooms')
    return response.data
}