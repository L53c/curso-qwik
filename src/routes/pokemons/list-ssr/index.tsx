import { component$, useComputed$ } from '@builder.io/qwik'
import {
  type DocumentHead,
  Link,
  routeLoader$,
  useLocation,
} from '@builder.io/qwik-city'
import { PokemonImage } from '~/components/pokemons/pokemon-image'
import { getSmallPokemons } from '~/helpers/get-pokemons'
import type { SmallPokemon } from '~/interfaces'

export const usePokemonList = routeLoader$<SmallPokemon[]>(
  async ({ query, redirect, pathname }) => {
    const offset = Number(query.get('offset') || '0')
    if (offset < 0 || isNaN(offset)) redirect(301, pathname)

    const pokemons = await getSmallPokemons(offset)
    return pokemons
  }
)

export default component$(() => {
  const pokemons = usePokemonList()
  const pokemonsAmount = 10
  const location = useLocation()

  const currentOffset = useComputed$<number>(() => {
    // const offsetString = location.url.searchParams.get('offset')
    const offsetString = new URLSearchParams(location.url.search)
    return Number(offsetString.get('offset') || 0)
  })

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span>Offset: {currentOffset}</span>
        <span>
          Estado página: {location.isNavigating ? 'Cargando...' : 'Cargada!'}
        </span>
      </div>

      <div class="mt-10">
        <Link
          href={`/pokemons/list-ssr/?offset=${
            currentOffset.value - pokemonsAmount
          }`}
          class="btn btn-primary mr-2"
        >
          Anterior
        </Link>
        <Link
          href={`/pokemons/list-ssr/?offset=${
            currentOffset.value + pokemonsAmount
          }`}
          class="btn btn-primary"
        >
          Siguiente
        </Link>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6 mt-5">
        {pokemons.value.map(p => (
          <div
            key={p.name}
            class="flex flex-col justify-center items-center m-5"
          >
            <PokemonImage id={p.id} isVisible />
            <span class="capitalize">{p.name}</span>
          </div>
        ))}
      </div>
    </>
  )
})

export const head: DocumentHead = {
  title: 'PokeQwik - SSR',
  meta: [
    {
      name: 'description',
      content: 'Esta es mi primera aplicación en Qwik',
    },
  ],
}
