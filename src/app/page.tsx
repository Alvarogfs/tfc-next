"use client"
import PokemonCard from '@/components/PokemonCard';
import { getList } from '@/utils/api';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query'
export default function Home() {
  const {data: pokemonList, isLoading} = useQuery({
    queryKey: ['pokemonList'],
    queryFn: getList
  });
  if(isLoading){
    return <div>loading</div>
  }
return(
  <main>
    <div className="grid xl:grid-cols-6 gap-6 mx-8 sm:grid-cols-1 justify-center items-center md:grid-cols-3 my-7">
    { pokemonList?.map((el) => <PokemonCard key={el.name} pokemon={el}></PokemonCard>) }
    </div>
  </main>
)
}
