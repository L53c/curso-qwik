import { component$, useSignal, useTask$ } from '@builder.io/qwik'

interface Props {
  id: number | string
  size?: number
  backImage?: boolean
  isVisible?: boolean
}

export const PokemonImage = component$(
  ({ id, size = 200, backImage = false, isVisible }: Props) => {
    const imageLoaded = useSignal(false)

    useTask$(({ track }) => {
      track(() => id)
      imageLoaded.value = false
    })

    return (
      <div
        class='flex items-center justify-center'
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        {imageLoaded.value ? null : (
          <div
            class='inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
            role='status'
          >
            <span class='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
              Loading...
            </span>
          </div>
        )}
        <img
          width={size}
          height={size}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            backImage ? 'back/' : ''
          }${id}.png`}
          alt='Imagen Pokemon'
          onLoad$={() => (imageLoaded.value = true)}
          class={`
          ${!imageLoaded.value && 'hidden'} ${isVisible ? '' : 'brightness-0'} transition-all`}
        />
      </div>
    )
  }
)
