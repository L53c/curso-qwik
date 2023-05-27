import { $, component$, useSignal } from '@builder.io/qwik'
import { type DocumentHead, useNavigate } from '@builder.io/qwik-city'
import { PokemonImage } from '~/components/pokemons/pokemon-image'

export default component$(() => {
  const goTo = useNavigate()
  const pokemonId = useSignal(1) // primitivos, por ejempo booleans, strings, numbers. For arrays, objects use useStore()

  const goToPokemon = $(async () => await goTo(`/pokemon/${pokemonId.value}/`))

  const showBackImage = useSignal(false)
  const showPokemon = useSignal(true)

  const changePokemonId = $((value: number) => {
    if (pokemonId.value + value <= 0 || pokemonId.value + value > 1010) return
    pokemonId.value += value
  })

  return (
    <>
      <span class="text-6xl mb-6">Buscador simple</span>
      <span class="text-9xl">{pokemonId}</span>

      <div onClick$={goToPokemon}>
        <PokemonImage
          id={pokemonId.value}
          backImage={showBackImage.value}
          isVisible={showPokemon.value}
        />
      </div>
      
      {/* Crear Imagen */}
      <div class="mt-2 flex flex-col gap-1">
        <div class="flex gap-2">
          <button
            onClick$={() => changePokemonId(-60)}
            class="btn btn-sup flex-1"
            disabled={pokemonId.value <= 60 ? true : false}
          >
            -60
          </button>
          <button
            onClick$={() => changePokemonId(-30)}
            class="btn btn-sup flex-1"
            disabled={pokemonId.value <= 30 ? true : false}
          >
            -30
          </button>
          <button
            onClick$={() => changePokemonId(+30)}
            class="btn btn-sup flex-1"
          >
            +30
          </button>
          <button
            onClick$={() => changePokemonId(+60)}
            class="btn btn-sup flex-1"
          >
            +60
          </button>
        </div>
        <div class="flex gap-2">
          <button
            onClick$={() => changePokemonId(-1)}
            class="btn btn-prev flex-1"
            disabled={pokemonId.value <= 1 ? true : false}
          >
            Anterior
          </button>
          <button
            onClick$={() => (pokemonId.value = 1)}
            class="btn btn-danger flex-1"
            disabled={pokemonId.value <= 1 ? true : false}
          >
            Reset
          </button>
          <button
            onClick$={() => changePokemonId(+1)}
            class="btn btn-next flex-1"
          >
            Siguiente
          </button>
        </div>
        <div class="flex gap-2">
          <button
            onClick$={() => (showBackImage.value = !showBackImage.value)}
            class="btn btn-primary flex-1"
          >
            Voltear
          </button>
          <button
            onClick$={() => (showPokemon.value = !showPokemon.value)}
            class="btn btn-primary flex-1"
          >
            {showPokemon.value ? 'Ocultar' : 'Mostrar'}
          </button>
        </div>
      </div>
    </>
  )
})

export const head: DocumentHead = {
  title: 'PokeQwik',
  meta: [
    {
      name: 'description',
      content: 'Esta es mi primera aplicación en Qwik',
    },
  ],
}
