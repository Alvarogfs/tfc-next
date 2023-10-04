"use client"
import { getList } from '@/utils/api';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query'
export default function Home() {
  const {data: pokemonList, isFetching} = useQuery({
    queryKey: ['pokemonList'],
    queryFn: getList
  });
  console.log({pokemonList});
  if(isFetching){
    return <div>loading</div>
  }
return(
  <main>
    { pokemonList?.map((el) => <div key={el.name}>{el.name}<img src={el.url}></img></div>) }
  </main>
)
}
