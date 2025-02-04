import { useGetPet, useGetWater } from '@/data'
import { getFormatToday, useAuth } from '@/shared'

export const useWater = () => {
  const today = getFormatToday()

  const { user } = useAuth()

  const { data: petData, isLoading: isPetDataLoading } = useGetPet({
    userId: user.id,
  })

  const title = 'Приём воды с ' + petData?.pet.name
  const description =
    'Регулярные совместные приемы воды с питомцем укрепляют его и ваше здоровье.'

  const { data: water, isLoading: isWaterLoading } = useGetWater({
    userId: user.id,
  })

  const currentProgress =
    water?.waterData?.[water.waterData?.length - 1].progress || 0

  const isLoading = isWaterLoading && isPetDataLoading

  return {
    today,
    waterData: water?.waterData,
    dailyNorm: water?.dailyNorm || 750,
    currentValue: water?.currentValue || 0,
    isLoading,
    title,
    description,
    currentProgress,
  }
}
