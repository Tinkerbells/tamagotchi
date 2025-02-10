import { useGetAchievements } from '@/data'
import { useAuth } from '@/shared'

export const useAchievement = () => {
  const { user } = useAuth()
  const { data: achievements, isLoading } = useGetAchievements({
    userId: user.id,
  })
  return {
    achievements,
    isLoading
  }
}
