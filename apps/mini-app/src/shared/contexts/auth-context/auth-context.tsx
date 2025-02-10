import { useGetPost, useGetUser, User } from '@/data'
import { LoadingScreen } from '@/screens'
import { useNavigate } from '@/shared/hooks'
import { vkBridge } from '@/shared/lib'
import { UserInfo } from '@vkontakte/vk-bridge'
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  PropsWithChildren,
} from 'react'

interface AuthContextType {
  user: User
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [vkUser, setVkUser] = useState<UserInfo | null>(null)
  const navigate = useNavigate()

  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useGetUser(
    { userId: vkUser?.id.toString()! },
    {
      enabled: vkUser !== null,
    }
  )

  useEffect(() => {
    const fetchVkUser = async () => {
      try {
        const user = await vkBridge.send('VKWebAppGetUserInfo')
        setVkUser(user)
      } catch (err) {
        console.error(err)
      }
    }
    fetchVkUser()
  }, [])

  useEffect(() => {
    if (isError) {
      console.log(error)
      navigate('/onboarding')
    }
  }, [isError, navigate])

  const value = useMemo(
    () => ({
      user: user!,
    }),
    [user]
  )
  if (isLoading || !user) {
    return <LoadingScreen />
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
