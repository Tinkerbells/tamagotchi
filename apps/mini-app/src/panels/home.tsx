import { StatusModal } from '@/modules'
import { client } from '@/shared/lib/api'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'
import {
  NavIdProps,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Tabbar,
  TabsItem,
} from '@vkontakte/vkui'
import { FC, useEffect } from 'react'

export const Home: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator()

  useEffect(() => {
    const fetchA = async () => {
      // const res = await client.
    }
  })

  return (
    <Panel id={id}>
      <PanelHeader
        before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}
      >
        <Tabbar className="top-0">
          <TabsItem>Hello</TabsItem>
          <TabsItem>Hello</TabsItem>
          <TabsItem>Hello</TabsItem>
          <TabsItem>Hello</TabsItem>
        </Tabbar>
        <StatusModal />
      </PanelHeader>
    </Panel>
  )
}
