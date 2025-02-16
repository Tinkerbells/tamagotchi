import { useGetPet } from '@/data'
import { useAuth } from '@/shared'

export function useWalking() {
  const { user } = useAuth()

  const { data: petData, isLoading: isPetDataLoading } = useGetPet({
    userId: user.id,
  })

  const title = `Прогулка с ${petData?.pet.name}`

  const description
    = 'Фиксируйте свои мысли – за что вы благодарны себе / окружающим / миру каждый день, принятие - первый шаг к балансу.'

  const isLoading = isPetDataLoading

  return {
    isLoading,
    title,
    description,
  }
}
