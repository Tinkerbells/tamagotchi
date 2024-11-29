import { HomeScreen } from '@/modules/screens'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'
import {
  NavIdProps,
  Panel,
} from '@vkontakte/vkui'
import { FC } from 'react'

export const Home: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator()

  return (
    <Panel id={id}>
      <HomeScreen />
    </Panel>
  )
}
