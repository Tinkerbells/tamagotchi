import { getIsTimer } from '../utils'
import { useMeditationTimer } from './use-meditation-timer'
import { useGetPet } from '@/data'
import { useAuth } from '@/shared'

export const useMeditation = () => {
  const { user } = useAuth()
  const { data: petData, isLoading: isPetDataLoading } = useGetPet({
    userId: user.id,
  })
  const {
    timeLeft,
    isRunning,
    isFinished,
    startTimer,
    stopTimer,
    toggleTimer,
    finishSession,
    progress,
  } = useMeditationTimer()

  const title = 'Медитация с ' + petData?.pet.name
  const description =
    'Медитируя с питомцем, вы успокаиваете его и себя. Это снижает уровень стресса и улучшает эмоциональное состояние.'
  const buttonText = getIsTimer()
    ? isRunning
      ? 'Завершить медитацию'
      : 'Продолжить медитацию'
    : 'Начать медитацию'

  return {
    buttonText,
    title,
    description,
    petData,
    isLoading: isPetDataLoading,
    timeLeft,
    isRunning,
    isFinished,
    startTimer,
    stopTimer,
    toggleTimer,
    finishSession,
    progress,
  }
}
