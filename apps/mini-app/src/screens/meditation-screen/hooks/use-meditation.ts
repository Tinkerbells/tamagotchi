import { useGetPet } from '@/data'
import { useAuth } from '@/shared'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import * as React from 'react'

dayjs.extend(duration)

const STORAGE_KEY = 'meditation-timer'

export const useMeditation = () => {
  const { user } = useAuth()
  const { data: petData, isLoading: isPetDataLoading } = useGetPet({
    userId: user.id,
  })

  const title = 'Медитация с ' + petData?.pet.name
  const description =
    'Медитируя с питомцем, вы успокаиваете его и себя. Это снижает уровень стресса и улучшает эмоциональное состояние.'

  const [timeLeft, setTimeLeft] = React.useState(15 * 60)
  const [isRunning, setIsRunning] = React.useState(false)
  const [isFinished, setIsFinished] = React.useState(false)

  // Load saved state on mount
  React.useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const { timeLeft } = JSON.parse(saved)
      setTimeLeft(timeLeft)
      setIsRunning(false)
    }
  }, [])

  // Save state whenever timeLeft or isRunning changes
  React.useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ timeLeft, isRunning }))
  }, [timeLeft, isRunning])

  // Timer logic
  React.useEffect(() => {
    let timer: ReturnType<typeof setInterval>
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            setIsRunning(false)
            setIsFinished(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [isRunning, timeLeft])

  const startTimer = () => {
    setIsRunning(true)
    setIsFinished(false)
  }

  const stopTimer = () => {
    setIsRunning(false)
  }

  const finishSession = () => {
    setTimeLeft(15 * 60)
    setIsFinished(false)
  }

  const formattedTimeLeft = dayjs.duration(timeLeft, 'seconds').format('mm:ss')

  return {
    title,
    description,
    timeLeft: formattedTimeLeft,
    isRunning,
    isFinished,
    startTimer,
    stopTimer,
    finishSession,
    petData,
    isLoading: isPetDataLoading,
  }
}
