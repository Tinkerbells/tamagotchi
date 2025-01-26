import { useGetPet, useGetStatistics } from '@/data'
import { useAuth } from '@/shared'

export const useProfile = () => {
  const { user } = useAuth()
  const { data: pet, isLoading: isPetLoading } = useGetPet({ userId: user.id })
  const { data: statistics, isLoading: isStatisticsLoading } = useGetStatistics(
    { userId: user.id }
  )

  return {
    pet,
    statistics,
    isPetLoading,
    isStatisticsLoading,
  }
}
