import { App } from './app-router'
import { router } from './routes'
import '@/assets/fonts.css'
import '@/assets/index.css'
import { AuthProvider } from '@/shared/contexts/auth-context/auth-context'
import { transformVKBridgeAdaptivity } from '@/utils'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import vkBridge, {
  parseURLSearchParamsForGetLaunchParams,
} from '@vkontakte/vk-bridge'
import {
  useAdaptivity,
  useAppearance,
  useInsets,
} from '@vkontakte/vk-bridge-react'
import { RouterProvider } from '@vkontakte/vk-mini-apps-router'
import { AdaptivityProvider, ConfigProvider, AppRoot } from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/components.css'

export const AppConfig = () => {
  const queryClient = new QueryClient()
  const vkBridgeAppearance = useAppearance() || undefined
  const vkBridgeInsets = useInsets() || undefined
  const adaptivity = transformVKBridgeAdaptivity(useAdaptivity())
  const { vk_platform } = parseURLSearchParamsForGetLaunchParams(
    window.location.search
  )

  return (
    <ConfigProvider
      appearance={vkBridgeAppearance}
      platform={vk_platform === 'desktop_web' ? 'vkcom' : undefined}
      isWebView={vkBridge.isWebView()}
      hasCustomPanelHeaderAfter={true}
    >
      <AdaptivityProvider {...adaptivity}>
        <AppRoot mode="full" safeAreaInsets={vkBridgeInsets}>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}>
              <App />
            </RouterProvider>
          </QueryClientProvider>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  )
}
