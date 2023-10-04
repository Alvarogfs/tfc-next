import { Pokedex } from "@/types/pokemon.types";
import axios from "axios";

const api = axios.create({
    baseURL: "https://pokeapi.co/api/v2/",
})

export const getList = async () => {
    const response = await api.get<Pokedex>("pokemon", {
        params : {
            limit: 151,
            offset: 0
        }
    })
    return response.data.results.map((el, index)=> ({...el, url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index+1}.png`}))
}