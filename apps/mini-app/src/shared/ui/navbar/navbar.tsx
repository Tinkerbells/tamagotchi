import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'

// import { Tabbar, TabsItem } from '@vkontakte/vkui'

export const Navbar = () => {
  const router = useRouteNavigator()
  return (
    <header>
      <nav>
        <ul>
          <li>Дом</li>
        </ul>
      </nav>
    </header>
  )
}
