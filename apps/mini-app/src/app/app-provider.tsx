import { LoadingScreen } from '@/screens'
import { vkBridge } from '@/shared'
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
} from 'react'

type AppProvider = 'vk' | 'telegram' | null

interface AppContextType {
  provider: AppProvider
}

const AppContext = createContext<AppContextType | undefined>(undefined)

interface AppProviderProps {
  children: ReactNode
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [provider, setProvider] = useState<AppProvider>(null)

  useEffect(() => {
    const checkVkPlatform = async () => {
      const isVk = await vkBridge.send('VKWebAppInit')
      if (isVk) setProvider('vk')
    }
    checkVkPlatform()
    // TODO write telegram provider support
    // const checkTelegramPlatform = async () => {}
    // checkTelegramPlatform()
  }, [])

  const value = useMemo(() => ({ provider }), [provider])

  if (!provider) {
    return <LoadingScreen />
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useProvider = (): AppContextType => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}
