import type {
  PropsWithChildren,
} from 'react'
import type { UserInfo } from '@vkontakte/vk-bridge'

import * as React from 'react'

import type { User } from '@/data'

import { useGetUser } from '@/data'
import { vkBridge } from '@/shared/lib'
import { LoadingScreen } from '@/screens'
import { useNavigate } from '@/shared/hooks'

interface AuthContextType {
  user: User
}

const AuthContext = React.createContext<AuthContextType | null>(null)

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [vkUser, setVkUser] = React.useState<UserInfo | null>(null)
  const navigate = useNavigate()

  const {
    data: user,
    isLoading,
    isError,
    error,
    failureCount,
  } = useGetUser(
    { userId: String(vkUser?.id) },
    {
      enabled: vkUser !== null,
    },
  )

  React.useEffect(() => {
    const fetchVkUser = async () => {
      try {
        const user = await vkBridge.send('VKWebAppGetUserInfo')
        setVkUser(user)
      }
      catch (err) {
        console.error(err)
      }
    }
    fetchVkUser()
  }, [])

  React.useEffect(() => {
    if (isError && failureCount > 3) {
      console.log(error)
      navigate('/onboarding')
    }
  }, [isError, navigate])

  const value = React.useMemo(
    () => ({
      user: user!,
    }),
    [user],
  )
  if (isLoading || !user) {
    return <LoadingScreen />
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextType {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
