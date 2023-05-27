import type { PokemonListResponse, SmallPokemon } from '~/interfaces'

export const getSmallPokemons = async (
  offset: number = 0,
  limit: number = 10
): Promise<SmallPokemon[]> => {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  )
  const data = (await res.json()) as PokemonListResponse
  return data.results.map(({url, name}) => {
    const segments = url.split('/')
    const id = segments.at(-2)! //exclamation mark is used to confirm is always two
    return {
      id,
      name,
    }
  })
}
