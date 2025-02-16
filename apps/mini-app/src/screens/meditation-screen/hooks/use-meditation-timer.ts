import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

dayjs.extend(duration)

export const STORAGE_KEY = 'meditation-timer'
const DEFAULT_TIME = 0.5 * 60

export function useMeditationTimer() {
  const [timeLeft, setTimeLeft] = useState(DEFAULT_TIME)
  const [isRunning, setIsRunning] = useState(false)
  const [isFinished, setIsFinished] = useState(false)

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Load saved state on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const { timeLeft, isRunning, isFinished } = JSON.parse(saved)
        setTimeLeft(timeLeft)
        setIsRunning(isRunning)
        setIsFinished(isFinished)
      }
    }
    catch (error) {
      console.error('Failed to load meditation state:', error)
    }
  }, [])

  // Save state whenever timeLeft, isRunning, or isFinished changes
  useEffect(() => {
    if (timeLeft !== DEFAULT_TIME || isRunning || isFinished) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ timeLeft, isRunning, isFinished }),
      )
    }
  }, [timeLeft, isRunning, isFinished])

  // Timer logic
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!)
            setIsRunning(false)
            setIsFinished(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => clearInterval(timerRef.current!)
  }, [isRunning, timeLeft])

  const startTimer = useCallback(() => {
    setIsRunning(true)
    setIsFinished(false)
  }, [])

  const stopTimer = useCallback(() => {
    setIsRunning(false)
  }, [])

  const toggleTimer = useCallback(() => {
    return isRunning ? stopTimer() : startTimer()
  }, [isRunning, stopTimer, startTimer])

  const finishSession = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setTimeLeft(DEFAULT_TIME)
    setIsFinished(false)
  }, [])

  const formattedTimeLeft = useMemo(
    () => dayjs.duration(timeLeft, 'seconds').format('mm:ss'),
    [timeLeft],
  )

  const progress = useMemo(() => {
    return Math.max(0, Math.round(100 - (timeLeft / DEFAULT_TIME) * 100))
  }, [timeLeft])

  return {
    timeLeft: formattedTimeLeft,
    progress,
    isRunning,
    isFinished,
    startTimer,
    stopTimer,
    toggleTimer,
    finishSession,
  }
}
