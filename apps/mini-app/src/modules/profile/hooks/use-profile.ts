import { useAuth } from '@/shared'
import { useGetPet, useGetStatistics } from '@/data'

export function useProfile() {
  const { user } = useAuth()
  const { data: pet, isLoading: isPetLoading } = useGetPet({ userId: user.id })
  const { data: statistics, isLoading: isStatisticsLoading } = useGetStatistics(
    { userId: user.id },
  )

  return {
    pet,
    statistics,
    isPetLoading,
    isStatisticsLoading,
  }
}
