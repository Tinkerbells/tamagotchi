import { LoadingScreen } from '@/modules/screens'
import { Home, Onboarding, PetCreation } from '@/panels'
import { DEFAULT_VIEW_PANELS } from '@/routes'
import { AuthStore, client } from '@/shared'
import { UserInfo } from '@vkontakte/vk-bridge'
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router'
import { View, SplitLayout, SplitCol } from '@vkontakte/vkui'
import { useState, useEffect, ReactNode } from 'react'

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.ONBOARDING } =
    useActiveVkuiLocation()
  const [fetchedUser, setUser] = useState<UserInfo | undefined>()
  const authStore = new AuthStore()

  const [popout, setPopout] = useState<ReactNode | null>(<LoadingScreen />)

  useEffect(() => {
    async function fetchData() {
      authStore.init()
      // const user = await vkBridge.send('VKWebAppGetUserInfo')
      try {
        const response = await client.user.$get()
        const json = await response.json()
      } catch (error) {
        console.error(error)
      }

      setPopout(null)
    }
    fetchData()
  }, [])

  return (
    <SplitLayout popout={popout}>
      <SplitCol>
        <View activePanel={activePanel}>
          <Home id="home" />
          <PetCreation id="pet-creation" />
          <Onboarding user={fetchedUser} id="onboarding" />
        </View>
      </SplitCol>
    </SplitLayout>
  )
}
