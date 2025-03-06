import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

dayjs.extend(duration)

export const WALKING_STORAGE_KEY = 'walking-timer'
const DEFAULT_WALKING_TIME = 10 * 60 // 10 minutes in seconds

export function useWalkingTimer() {
  const [timeLeft, setTimeLeft] = useState(DEFAULT_WALKING_TIME)
  const [isRunning, setIsRunning] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Load saved state on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(WALKING_STORAGE_KEY)
      if (saved) {
        const { timeLeft, isRunning, isFinished } = JSON.parse(saved)
        setTimeLeft(timeLeft)
        setIsRunning(isRunning)
        setIsFinished(isFinished)
      }
    }
    catch (error) {
      console.error('Failed to load walking timer state:', error)
    }
  }, [])

  // Save state whenever timeLeft, isRunning, or isFinished changes
  useEffect(() => {
    if (timeLeft !== DEFAULT_WALKING_TIME || isRunning || isFinished) {
      localStorage.setItem(
        WALKING_STORAGE_KEY,
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
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
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
    localStorage.removeItem(WALKING_STORAGE_KEY)
    setTimeLeft(DEFAULT_WALKING_TIME)
    setIsFinished(false)
    setIsRunning(false)
  }, [])

  const resetTimer = useCallback(() => {
    setTimeLeft(DEFAULT_WALKING_TIME)
    setIsFinished(false)
    setIsRunning(false)
  }, [])

  const formattedTimeLeft = useMemo(
    () => dayjs.duration(timeLeft, 'seconds').format('mm:ss'),
    [timeLeft],
  )

  const progress = useMemo(() => {
    return Math.max(0, Math.round(100 - (timeLeft / DEFAULT_WALKING_TIME) * 100))
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
    resetTimer,
  }
}

export function getIsWalkingTimer() {
  try {
    return localStorage.getItem(WALKING_STORAGE_KEY) !== null
  }
  catch {
    return false
  }
}
