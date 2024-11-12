import { LoadingScreen } from './modules'
import { Home, Onboarding } from './panels'
import { DEFAULT_VIEW_PANELS } from './routes'
import { env, vkBridge } from './shared'
import { UserInfo } from '@vkontakte/vk-bridge'
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router'
import { View, SplitLayout, SplitCol } from '@vkontakte/vkui'
import { useState, useEffect, ReactNode } from 'react'

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.ONBOARDING } =
    useActiveVkuiLocation()
  const [fetchedUser, setUser] = useState<UserInfo | undefined>()
  console.log(env.NODE_ENV)
  const [popout, setPopout] = useState<ReactNode | null>(<LoadingScreen />)

  useEffect(() => {
    async function fetchData() {
      const user = await vkBridge.send('VKWebAppGetUserInfo')
      setUser(user)
      setPopout(null)
    }
    fetchData()
  }, [])

  return (
    <SplitLayout popout={popout}>
      <SplitCol>
        <View activePanel={activePanel}>
          <Home id="home" />
          <Onboarding user={fetchedUser} id="onboarding" />
        </View>
      </SplitCol>
    </SplitLayout>
  )
}
