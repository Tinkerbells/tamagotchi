import { useAuth } from '@/shared'
import { useGetAchievements } from '@/data'

export function useAchievement() {
  const { user } = useAuth()
  const { data: achievements, isLoading } = useGetAchievements({
    userId: user.id,
  })
  return {
    achievements,
    isLoading,
  }
}
