import { component$ } from '@builder.io/qwik'
import { routeLoader$ } from '@builder.io/qwik-city'
import { PokemonImage } from '~/components/pokemons/pokemon-image'

export const usePokemonId = routeLoader$<number>(({ params, redirect }) => {
  const id = Number(params.id)
  if (isNaN(id) || id <= 0 || id > 1010) redirect(301, '/')
  return id
})

export default component$(() => {
  const pokemonId = usePokemonId()
  return (
    <>
      <span class="text-5xl text-amber-500">Pokemon: {pokemonId}</span>
      <PokemonImage id={pokemonId.value} isVisible />
    </>
  )
})
