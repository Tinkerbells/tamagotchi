import * as React from 'react'

import { getFormatToday, useAuth } from '@/shared'
import { useGetPet, useGetSleep, useUpdateSleep } from '@/data'

import { getCurrentSleepValue } from '../utils'

export function useSleep() {
  const today = getFormatToday()

  const { user } = useAuth()

  const { data: petData, isLoading: isPetDataLoading } = useGetPet({
    userId: user.id,
  })

  const title = `Сон с ${petData?.pet.name}`
  const description
    = 'Регулярный полноценный сон укрепляет здоровье и помогает вам чувствовать себя бодрее вместе с питомцем!'

  const { mutate: updateSleepMutation, isPending: isSleepUpdating }
    = useUpdateSleep()

  const {
    data: sleep,
    isLoading: isSleepLoading,
    isSuccess,
  } = useGetSleep({
    userId: user.id,
  })

  const [currentProgress, setCurrentProgress] = React.useState(0)

  React.useEffect(() => {
    if (sleep) {
      if (isSuccess) {
        const progress = sleep?.sleepData[sleep.sleepData.length - 1].progress
        setCurrentProgress(progress)
      }
    }
  }, [sleep, isSuccess])

  const updateSleep = () => {
    updateSleepMutation({
      userId: user.id,
      currentValue: getCurrentSleepValue(
        currentProgress,
        sleep?.dailyNorm || 8,
      ),
    })
  }

  const isLoading = isSleepLoading && isPetDataLoading

  return {
    today,
    data: sleep?.sleepData,
    dailyNorm: sleep?.dailyNorm || 8,
    currentValue: sleep?.currentValue || 0,
    isLoading,
    title,
    description,
    currentProgress,
    setCurrentProgress,
    updateSleep,
    isSleepUpdating,
  }
}
