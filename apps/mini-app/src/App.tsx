import { Home, Onboarding } from './panels'
import { DEFAULT_VIEW_PANELS } from './routes'
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router'
import { View, SplitLayout, SplitCol, ScreenSpinner } from '@vkontakte/vkui'
import { useState, useEffect, ReactNode } from 'react'

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.ONBOARDING } =
    useActiveVkuiLocation()
  // const [fetchedUser, setUser] = useState<UserInfo | undefined>();
  const [popout, setPopout] = useState<ReactNode | null>(
    <ScreenSpinner size="large" />
  )

  useEffect(() => {
    async function fetchData() {
      // const user = await bridge.send("VKWebAppGetUserInfo");
      // setUser(user);
      setPopout(null)
    }
    fetchData()
  }, [])

  return (
    <SplitLayout popout={popout}>
      <SplitCol>
        <View activePanel={activePanel}>
          <Home id="home" />
          <Onboarding id="onboarding" />
        </View>
      </SplitCol>
    </SplitLayout>
  )
}
