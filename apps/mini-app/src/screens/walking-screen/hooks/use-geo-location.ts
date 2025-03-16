import toast from 'react-hot-toast'
import { useCallback, useEffect, useRef, useState } from 'react'

import type { GeoPosition, WalkingProgressType } from '@/data'

import { GEMS_TO_ADD, useAuth, vkBridge } from '@/shared'
import { useCreateWalking, useGetPet, useGetWalkings, useUpdateUser } from '@/data'

import { getIsWalkingTimer, useWalkingTimer } from './use-walking-timer'

const MIN_DISTANCE_THRESHOLD = 0.005 // 5 meters minimum to count as movement
const MAX_DISTANCE_THRESHOLD = 0.5 // 500 meters maximum to prevent GPS jumps
const DEFAULT_TRACKING_INTERVAL = 10000 // 10 seconds between updates

export function useWalking(trackingInterval = DEFAULT_TRACKING_INTERVAL) {
  const { user } = useAuth()
  const userId = user?.id

  const { data: petData, isLoading: isPetDataLoading } = useGetPet({
    userId: user.id,
  })

  const title = `Прогулка с ${petData?.pet.name || 'питомцем'}`
  const description = 'Гуляя с питомцем, вы укрепляете его и свое самочувствие. Прогулки снимают стресс, заряжают энергией и укрепляют вашу связь.'

  // Timer integration
  const {
    timeLeft,
    progress,
    isRunning: isTimerRunning,
    isFinished: isTimerFinished,
    startTimer,
    stopTimer,
    toggleTimer,
    finishSession,
  } = useWalkingTimer()

  const [isFinishDrawerOpen, setIsFinishDrawerOpen] = useState(false)

  const handleDrawerOpen = (value: boolean) => {
    setIsFinishDrawerOpen(value)
  }

  // State
  const [error, setError] = useState<string | null>(null)
  const [positions, setPositions] = useState<GeoPosition[]>([])
  const [isWalking, setIsWalking] = useState<boolean>(false)
  const [todayDistance, setTodayDistance] = useState<number>(0)
  const [totalDistance, setTotalDistance] = useState<number>(0)
  const [isSaving, setIsSaving] = useState<boolean>(false)

  console.log(todayDistance, totalDistance)

  const lastPositionRef = useRef<GeoPosition | null>(null)
  const [lastPosition, setLastPosition] = useState<GeoPosition | null>(null)

  const [todayWalkingId, setTodayWalkingId] = useState<number | null>(null)

  const isMountedRef = useRef<boolean>(true)

  // React Query hooks
  const { data: walkings, isLoading: isLoadingWalkings } = useGetWalkings(
    { userId: userId || 0 },
    { enabled: !!userId },
  )

  const { mutate: createWalking, isPending: isCreatingWalking } = useCreateWalking({ onSuccess: () => toast('Вы успешно завершили прогулку') })

  // Update user gems when watching ads
  const { mutate: updateUser, isPending: isUpdateUserLoading } = useUpdateUser({
    onSuccess: () => {
      finishWalking() // Save the walking data after gems are updated
    },
    onError: () => {
      toast.error('Что-то пошло не так!')
    },
  })

  // Ad state tracking
  const [adsState, setAdsState] = useState({
    isLoading: false,
    isSuccess: false,
    error: null,
  })

  const isLoading = isLoadingWalkings || isCreatingWalking || isPetDataLoading || isSaving

  const getRealGeoPosition = useCallback(async (): Promise<GeoPosition | null> => {
    try {
      const geoData = await vkBridge.send('VKWebAppGetGeodata')

      if (!geoData.available) {
        setError('Геолокация недоступна. Проверьте разрешения на доступ к местоположению.')
        return null
      }
      console.log({
        lat: geoData.lat,
        long: geoData.long,
        accuracy: geoData.accuracy || 0,
        available: Boolean(geoData.available),
        timestamp: Date.now(),
      },
      )
      return {
        lat: geoData.lat,
        long: geoData.long,
        accuracy: geoData.accuracy || 0,
        available: Boolean(geoData.available),
        timestamp: Date.now(),
      }
    }
    catch (e) {
      setError(`Ошибка при получении геолокации: ${(e as Error).message}`)
      return null
    }
  }, [])

  // Calculate distance between two points
  const calculateDistance = useCallback((lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371 // Radius of the earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a
      = Math.sin(dLat / 2) * Math.sin(dLat / 2)
        + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180)
        * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c // Distance in km
    return distance
  }, [])

  // Save the current distance to the backend
  const saveDistance = useCallback((finished: boolean = false) => {
    if (!userId)
      return

    setIsSaving(true)
    const distanceInMeters = Math.round(todayDistance * 1000) // Convert km to meters for storage

    createWalking({
      userId,
      currentValue: distanceInMeters,
      date: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD
      finished,
    }, {
      onSettled: () => {
        setIsSaving(false)
        if (finished) {
          finishSession() // Reset the timer when walk is saved as finished
        }
      },
    })
  }, [userId, todayDistance, createWalking, finishSession])

  // Handle updating user gems
  const updateUserGems = useCallback(() => {
    if (!user)
      return
    updateUser({ userId: user.id, gems: user.gems + GEMS_TO_ADD })
  }, [user, updateUser])

  // Handle finishing walk with ads
  const finishWalkingWithAds = useCallback(async () => {
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
      handleDrawerOpen(false)
    }
  }, [updateUserGems, finishSession, handleDrawerOpen])

  // Start tracking and timer
  const startTracking = useCallback(() => {
    startTimer()
  }, [startTimer])

  // Pause tracking and timer
  const stopTracking = useCallback(() => {
    stopTimer()
  }, [stopTimer])

  // Finish walking - save with finished=true
  const finishWalking = useCallback(() => {
    stopTimer()
    saveDistance(true)
    handleDrawerOpen(false)
  }, [stopTimer, saveDistance, handleDrawerOpen])

  // Show finish drawer when timer is complete
  useEffect(() => {
    if (isTimerFinished) {
      handleDrawerOpen(true)
    }
  }, [isTimerFinished])

  // Initialize data from backend when walkings data is loaded
  useEffect(() => {
    if (!walkings)
      return

    const todayRecord = getTodayWalking(walkings)

    if (todayRecord) {
      // Get the ID from the matching record
      const matchingRecord = walkings.find(w => w.date === todayRecord.date)
      if (matchingRecord && 'id' in matchingRecord) {
        setTodayWalkingId((matchingRecord as any).id)
      }

      // Set today's distance (convert from meters to kilometers)
      setTodayDistance(todayRecord.currentValue / 1000)
    }
    else {
      setTodayDistance(0)
    }

    // Calculate total distance from all records (convert from meters to kilometers)
    const total = walkings.reduce((sum, record) => sum + record.currentValue, 0) / 1000
    setTotalDistance(total)
  }, [walkings])

  // Cleanup effect
  useEffect(() => {
    return () => {
      isMountedRef.current = false
    }
  }, [])

  // Effect to track position when timer is running
  useEffect(() => {
    if (!isTimerRunning)
      return

    const trackPosition = async () => {
      const newPosition = await getRealGeoPosition()

      if (!isMountedRef.current)
        return

      if (!newPosition)
        return

      if (isMountedRef.current) {
        setPositions(prev => [...prev, newPosition])
      }

      const currentLastPosition = lastPositionRef.current

      lastPositionRef.current = newPosition
      if (isMountedRef.current) {
        setLastPosition(newPosition)
      }

      if (currentLastPosition) {
        const distance = calculateDistance(
          currentLastPosition.lat,
          currentLastPosition.long,
          newPosition.lat,
          newPosition.long,
        )

        if (distance > MIN_DISTANCE_THRESHOLD && distance < MAX_DISTANCE_THRESHOLD) {
          if (isMountedRef.current) {
            setTodayDistance(prev => prev + distance)
            setTotalDistance(prev => prev + distance)
            setIsWalking(true)
          }
        }
        else {
          if (isMountedRef.current) {
            setIsWalking(false)
          }
        }
      }
    }

    trackPosition()

    const intervalId = window.setInterval(trackPosition, trackingInterval)

    return () => {
      if (intervalId !== undefined) {
        clearInterval(intervalId)
      }
    }
  }, [isTimerRunning, getRealGeoPosition, trackingInterval, calculateDistance])

  // Prepare button text based on timer state
  const buttonText = getIsWalkingTimer()
    ? isTimerRunning || isTimerFinished
      ? 'Завершить прогулку'
      : 'Продолжить прогулку'
    : 'Начать прогулку'

  // Calculate if ad or finish button is loading
  const isFinishingWithAdsLoading = adsState.isLoading || isUpdateUserLoading || isCreatingWalking
  const isFinishingLoading = isCreatingWalking

  return {
    walkingStats: {
      totalDistance,
      todayDistance,
      lastPosition,
      positions,
      isWalking,
    },
    isFinishDrawerOpen,
    handleDrawerOpen,
    title,
    description,
    isTracking: isTimerRunning,
    isFinished: isTimerFinished,
    isLoading,
    isSaving,
    error,
    startTracking,
    stopTracking,
    toggleTimer,
    finishWalking,
    finishWalkingWithAds,
    isFinishingWithAdsLoading,
    isFinishingLoading,
    buttonText,
    timeLeft,
    progress,
  }
}

// Get today's walking entry from an array of walkings
export function getTodayWalking(walkings: WalkingProgressType[]): WalkingProgressType | undefined {
  const today = new Date().toISOString().split('T')[0] // Format as YYYY-MM-DD
  return walkings.find(walking => walking.date === today)
}
