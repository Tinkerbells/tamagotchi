import { useEffect, useRef } from 'react'

import { useAuth } from '@/shared'
import { useCheckAchievements } from '@/data/achievements'

/**
 * Hook that automatically checks for achievements when called from components
 * that represent completed activities (water, meditation, etc)
 */
export function useAutoCheckAchievements() {
  const { user } = useAuth()
  const { mutate: checkAchievements } = useCheckAchievements()
  const hasCheckedRef = useRef(false)

  useEffect(() => {
    // Only check once per component mount to avoid spamming the API
    if (!hasCheckedRef.current && user?.id) {
      setTimeout(() => {
        checkAchievements({ userId: user.id })
        hasCheckedRef.current = true
      }, 500) // Small delay to allow the activity to be registered first
    }

    return () => {
      // Reset on unmount
      hasCheckedRef.current = false
    }
  }, [user?.id, checkAchievements])

  return { checkAchievements }
}
