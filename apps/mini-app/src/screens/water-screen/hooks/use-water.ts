import { getCurrentWaterValue } from '../utils'
import { useGetPet, useGetWater, useUpdateWater } from '@/data'
import { getFormatToday, useAuth } from '@/shared'
import * as React from 'react'

export const useWater = () => {
  const today = getFormatToday()

  const { user } = useAuth()

  const { data: petData, isLoading: isPetDataLoading } = useGetPet({
    userId: user.id,
  })

  const title = 'Приём воды с ' + petData?.pet.name
  const description =
    'Регулярные совместные приемы воды с питомцем укрепляют его и ваше здоровье.'

  const { mutate: updateWaterMutation, isPending: isWaterUpdating } =
    useUpdateWater()

  const {
    data: water,
    isLoading: isWaterLoading,
    isSuccess,
  } = useGetWater({
    userId: user.id,
  })

  const [currentProgress, setCurrentProgress] = React.useState(0)

  React.useEffect(() => {
    if (water) {
      if (isSuccess) {
        const progress = water?.waterData[water.waterData.length - 1].progress
        setCurrentProgress(progress)
        return
      }
    }
  }, [water, isSuccess])

  const updateWater = () => {
    updateWaterMutation({
      userId: user.id,
      currentValue: getCurrentWaterValue(
        currentProgress,
        water?.dailyNorm || 750
      ),
    })
  }

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
    setCurrentProgress,
    updateWater,
    isWaterUpdating,
  }
}
