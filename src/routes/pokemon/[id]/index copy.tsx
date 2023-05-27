import { component$ } from '@builder.io/qwik'
import { useLocation } from '@builder.io/qwik-city'
import { PokemonImage } from '~/components/pokemons/pokemon-image'

export default component$(() => {
  const {
    params: { id },
  } = useLocation()
  return (
    <>
      <span class="text-5xl text-amber-500">Pokemon: {id}</span>
      <PokemonImage id={id} isVisible />
    </>
  )
})
