import {
  $,
  component$,
  useOnDocument,
  useStore,
  useTask$,
} from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { PokemonImage } from '~/components/pokemons/pokemon-image'
import { getSmallPokemons } from '~/helpers/get-pokemons'
import type { SmallPokemon } from '~/interfaces'

interface PokemonPageState {
  currentPage: number
  isLoading: boolean
  pokemons: SmallPokemon[]
}

export default component$(() => {
  const pokemonState = useStore<PokemonPageState>({
    currentPage: 0,
    isLoading: false,
    pokemons: [],
  })

  // useVisibleTask se ejecuta del lado cliente
  // useVisibleTask$(async ({ track }) => {
  //   track(() => pokemonState.currentPage)
  //   const pokemons = await getSmallPokemons(pokemonState.currentPage * 10)
  //   pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons]
  // })

  // useTask se ejecuta del lado del servidor y cliente
  useTask$(async ({ track }) => {
    track(() => pokemonState.currentPage)
    const pokemons = await getSmallPokemons(pokemonState.currentPage * 10)
    pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons]
    pokemonState.isLoading = false
  })

  useOnDocument(
    'scroll',
    $(() => {
      const maxScroll = document.body.scrollHeight
      const currentScroll = window.scrollY + window.innerHeight

      if (currentScroll + 200 >= maxScroll && !pokemonState.isLoading) {
        pokemonState.isLoading = true
        pokemonState.currentPage++
      }
    })
  )

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span>Página actual: {pokemonState.currentPage}</span>
        <span>Estado página: </span>
      </div>

      <div class="mt-10">
        <button
          onClick$={() => pokemonState.currentPage--}
          class="btn btn-primary mr-2"
        >
          Anterior
        </button>
        <button
          onClick$={() => pokemonState.currentPage++}
          class="btn btn-primary"
        >
          Siguiente
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6 mt-5">
        {pokemonState.pokemons.map(({ id, name }) => (
          <div key={id} class="flex flex-col justify-center items-center m-5">
            <PokemonImage id={id} isVisible />
            <span class="capitalize">{name}</span>
          </div>
        ))}
      </div>
    </>
  )
})

export const head: DocumentHead = {
  title: 'PokeQwik - Client',
  meta: [
    {
      name: 'description',
      content:
        'Esta es mi primera aplicación en Qwik, following a tutorial by Fernando Herrera',
    },
  ],
}
