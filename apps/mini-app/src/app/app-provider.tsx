import * as React from 'react'

import { vkBridge } from '@/shared'
import { LoadingScreen } from '@/screens'

type AppProviderType = 'vk' | 'telegram' | null

interface AppContextType {
  provider: AppProviderType
}

const AppContext = React.createContext<AppContextType | undefined>(undefined)

type AppProviderProps = React.PropsWithChildren

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [provider, setProvider] = React.useState<AppProviderType>(null)

  React.useEffect(() => {
    const checkVkPlatform = async () => {
      const isVk = await vkBridge.send('VKWebAppInit')
      if (isVk)
        setProvider('vk')
    }
    checkVkPlatform()
    // TODO write telegram provider support
    // const checkTelegramPlatform = async () => {}
    // checkTelegramPlatform()
  }, [])

  const value = React.useMemo(() => ({ provider }), [provider])

  if (!provider) {
    return <LoadingScreen />
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useProvider(): AppContextType {
  const context = React.useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}
