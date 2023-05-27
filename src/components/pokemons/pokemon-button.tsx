import { $, component$ } from '@builder.io/qwik'

interface Props {
  n: number
  fn: Promise<void>
  t: string
}

export const PokemonButton = component$(({ n, fn, t }: Props) => {
  const changePokemonId = $((n: number) => {
    if (n + n <= 0) return
    if (n + n > 1010) return

    n += n
  })
  return (
    <button onClick$={() => fn(n)} class='btn btn-primary'>
      {t}
    </button>
  )
})
