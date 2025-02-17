import * as React from 'react'
import toast from 'react-hot-toast'

import { useAuth, vkBridge } from '@/shared'
import { useGetPet, useUpdateUser } from '@/data'
import { useCreateMeditation } from '@/data/meditation'

import { getIsTimer } from '../utils'
import { useMeditationTimer } from './use-meditation-timer'

export const GEMS_TO_ADD = 5

export function useMeditation() {
  const { user } = useAuth()
  const {
    isRunning,
    isFinished,
    toggleTimer,
    finishSession,
    timeLeft,
    progress,
  } = useMeditationTimer()

  const { data: petData, isLoading: isPetDataLoading } = useGetPet({
    userId: user.id,
  })

  const [isFinishDrawerOpen, setIsFinishDrawerOpen] = React.useState(false)

  const handleDrawerOpen = (value: boolean) => {
    setIsFinishDrawerOpen(value)
  }

  const { mutate: createMeditation, isPending: isMeditationLoading }
    = useCreateMeditation({
      onSuccess: () => {
        finishSession()
        setIsFinishDrawerOpen(false)
      },
      onError: () => {
        toast.error('Что-то пошло не так!')
        finishSession()
      },
    })

  const { mutate: updateUser, isPending: isUpdateUserLoading } = useUpdateUser({
    onSuccess: () => {
      createMeditation({ userId: user.id })
    },
    onError: () => {
      toast.error('Что-то пошло не так!')
    },
  })

  const [adsState, setAdsState] = React.useState({
    isLoading: false,
    isSuccess: false,
    error: null,
  })

  const finishMeditation = React.useCallback(() => {
    createMeditation({ userId: user.id })
  }, [createMeditation, user])

  const updateUserGems = React.useCallback(() => {
    updateUser({ userId: user.id, gems: user.gems + GEMS_TO_ADD })
  }, [createMeditation, user])

  const finishMeditationWithAds = React.useCallback(async () => {
    setAdsState({ isLoading: true, isSuccess: false, error: null })
    try {
      const response = await vkBridge.send('VKWebAppShowNativeAds', {
        // eslint-disable-next-line ts/ban-ts-comment
        // @ts-ignore
        ad_format: 'reward',
      })
      if (!response.result) {
        throw new Error('Ошибка при показе рекламы')
      }
      setAdsState({ isLoading: false, isSuccess: true, error: null })
      updateUserGems()
    }
    catch (error) {
      console.error(error)
      toast.error('Что-то пошло не так!')
      finishSession()
      setAdsState({ isLoading: false, isSuccess: false, error: null })
    }
  }, [updateUser])

  React.useEffect(() => {
    if (isFinished) {
      setIsFinishDrawerOpen(true)
    }
  }, [isFinished])

  const title = `Медитация с ${petData?.pet?.name || 'питомцем'}`
  const description
    = 'Медитируя с питомцем, вы успокаиваете его и себя. Это снижает уровень стресса и улучшает эмоциональное состояние.'

  const buttonText = getIsTimer()
    ? isRunning || isFinished
      ? 'Завершить медитацию'
      : 'Продолжить медитацию'
    : 'Начать медитацию'

  const isFinishingWithAdsLoading = adsState.isLoading || isMeditationLoading || isUpdateUserLoading

  const isFinishingLoading = isMeditationLoading

  const isLoading = isPetDataLoading

  return {
    isLoading,
    isFinishDrawerOpen,
    handleDrawerOpen,
    toggleTimer,
    finishMeditation,
    finishMeditationWithAds,
    isFinishingWithAdsLoading,
    isFinishingLoading,
    buttonText,
    title,
    description,
    petData,
    isRunning,
    isFinished,
    timeLeft,
    progress,
  }
}
