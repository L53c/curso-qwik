import { component$ } from '@builder.io/qwik'
import { Link, useLocation } from '@builder.io/qwik-city'
import { QwikLogo } from '../../icons/qwik'
import styles from './navbar.module.css'

export default component$(() => {
  const {
    url: { pathname },
  } = useLocation()
  const ssr = pathname.includes('ssr')
  console.log(pathname, {ssr})

  return (
    <header class={styles.header}>
      <div class={['container', styles.wrapper]}>
        <div class={styles.logo}>
          <Link href="/" title="qwik">
            <QwikLogo width={93} />
          </Link>
        </div>
        <ul>
          <li>
            <Link
              class={`text-lg`}
              href="/pokemons/list-ssr/"
            >
              SSR-List
            </Link>
          </li>
          <li>
            <Link
              class={`text-lg`}
              href="/pokemons/list-client/"
            >
              Client-List
            </Link>
          </li>
        </ul>
      </div>
    </header>
  )
})
