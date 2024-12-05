import { DEFAULT_VIEW_PANELS } from './routes'
import { Home, Onboarding, PetCreation } from '@/panels'
import { AuthProvider } from '@/shared/contexts/auth-context/auth-context'
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router'
import { View, SplitLayout, SplitCol } from '@vkontakte/vkui'

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } =
    useActiveVkuiLocation()

  return (
    <SplitLayout>
      <SplitCol>
        <View activePanel={activePanel}>
          <Home id="home" />
          <PetCreation id="pet-creation" />
          <Onboarding id="onboarding" />
        </View>
      </SplitCol>
    </SplitLayout>
  )
}
