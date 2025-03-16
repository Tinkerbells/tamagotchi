import * as React from 'react'

import { useAuth } from '@/shared'
import { useCheckAchievements } from '@/data/achievements'

// Context type definition
interface AchievementsContextType {
  checkForAchievements: () => void
  isChecking: boolean
}

// Create the context with a default value
const AchievementsContext = React.createContext<AchievementsContextType | undefined>(undefined)

// Custom hook to use the context
export function useAchievementsContext() {
  const context = React.useContext(AchievementsContext)
  if (!context) {
    throw new Error('useAchievementsContext must be used within an AchievementsProvider')
  }
  return context
}

interface AchievementsProviderProps {
  children: React.ReactNode
  checkOnMount?: boolean
  checkInterval?: number // in milliseconds
}

export function AchievementsProvider({
  children,
  checkOnMount = true,
  checkInterval = 0, // 0 means no interval checking
}: AchievementsProviderProps) {
  const { user } = useAuth()
  const { mutate: checkAchievements, isPending: isChecking } = useCheckAchievements()

  // Reference to track if we've checked on this mount
  const hasCheckedRef = React.useRef(false)

  // Function to check for achievements
  const checkForAchievements = React.useCallback(() => {
    if (user?.id) {
      checkAchievements({ userId: user.id })
    }
  }, [user, checkAchievements])

  // Check for achievements on mount if enabled
  React.useEffect(() => {
    if (checkOnMount && !hasCheckedRef.current && user?.id) {
      // Short delay to ensure any prerequisite data has loaded
      const timer = setTimeout(() => {
        checkForAchievements()
        hasCheckedRef.current = true
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [checkOnMount, checkForAchievements, user?.id])

  // Set up interval checking if enabled
  React.useEffect(() => {
    if (checkInterval > 0 && user?.id) {
      const intervalId = setInterval(() => {
        checkForAchievements()
      }, checkInterval)

      return () => clearInterval(intervalId)
    }
  }, [checkInterval, checkForAchievements, user?.id])

  // Reset checked flag when component unmounts
  React.useEffect(() => {
    return () => {
      hasCheckedRef.current = false
    }
  }, [])

  // Context value
  const value = React.useMemo(() => ({
    checkForAchievements,
    isChecking,
  }), [checkForAchievements, isChecking])

  return (
    <AchievementsContext.Provider value={value}>
      {children}
    </AchievementsContext.Provider>
  )
}

// HOC to wrap any component with the AchievementsProvider
export function withAchievementCheck<P extends object>(
  Component: React.ComponentType<P>,
  providerProps?: Omit<AchievementsProviderProps, 'children'>,
) {
  return function WithAchievementCheck(props: P) {
    return (
      <AchievementsProvider {...providerProps}>
        <Component {...props} />
      </AchievementsProvider>
    )
  }
}
