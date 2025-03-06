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
  console.log('[useWalking] Initializing with tracking interval:', trackingInterval)

  const { user } = useAuth()
  const userId = user?.id
  console.log('[useWalking] User ID:', userId)

  const { data: petData, isLoading: isPetDataLoading } = useGetPet({
    userId: user.id,
  })
  console.log('[useWalking] Pet data loaded:', petData?.pet.name, 'Loading:', isPetDataLoading)

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
  console.log('[useWalking] Timer state:', { timeLeft, progress, isTimerRunning, isTimerFinished })

  const [isFinishDrawerOpen, setIsFinishDrawerOpen] = useState(false)

  const handleDrawerOpen = (value: boolean) => {
    console.log('[useWalking] Setting finish drawer open:', value)
    setIsFinishDrawerOpen(value)
  }

  // State
  const [error, setError] = useState<string | null>(null)
  const [positions, setPositions] = useState<GeoPosition[]>([])
  const [isWalking, setIsWalking] = useState<boolean>(false)
  const [todayDistance, setTodayDistance] = useState<number>(0)
  const [totalDistance, setTotalDistance] = useState<number>(0)
  const [isSaving, setIsSaving] = useState<boolean>(false)

  console.log('[useWalking] Current distance stats:', { todayDistance, totalDistance, isWalking, positionsCount: positions.length })

  const lastPositionRef = useRef<GeoPosition | null>(null)
  const [lastPosition, setLastPosition] = useState<GeoPosition | null>(null)

  const [todayWalkingId, setTodayWalkingId] = useState<number | null>(null)

  const isMountedRef = useRef<boolean>(true)

  // React Query hooks
  const { data: walkings, isLoading: isLoadingWalkings } = useGetWalkings(
    { userId: userId || 0 },
    { enabled: !!userId },
  )
  console.log('[useWalking] Walkings data loaded:', walkings?.length, 'Loading:', isLoadingWalkings)

  const { mutate: createWalking, isPending: isCreatingWalking } = useCreateWalking({
    onSuccess: () => {
      console.log('[useWalking] Walking created successfully')
      toast('Вы успешно завершили прогулку')
    },
    onError: (error) => {
      console.error('[useWalking] Error creating walking:', error)
    },
  })

  // Ad state tracking
  const [adsState, setAdsState] = useState({
    isLoading: false,
    isSuccess: false,
    error: null,
  })

  const isLoading = isLoadingWalkings || isCreatingWalking || isPetDataLoading || isSaving
  console.log('[useWalking] Overall loading state:', isLoading, {
    isLoadingWalkings,
    isCreatingWalking,
    isPetDataLoading,
    isSaving,
  })

  const getRealGeoPosition = useCallback(async (): Promise<GeoPosition | null> => {
    console.log('[useWalking] Getting real geo position')
    try {
      const geoData = await vkBridge.send('VKWebAppGetGeodata')
      console.log('[useWalking] Geo data received:', geoData)

      if (!geoData.available) {
        console.warn('[useWalking] Geolocation not available')
        setError('Геолокация недоступна. Проверьте разрешения на доступ к местоположению.')
        return null
      }

      return {
        lat: geoData.lat,
        long: geoData.long,
        accuracy: geoData.accuracy || 0,
        available: Boolean(geoData.available),
        timestamp: Date.now(),
      }
    }
    catch (e) {
      const errorMessage = `Ошибка при получении геолокации: ${(e as Error).message}`
      console.error('[useWalking] Geolocation error:', e)
      setError(errorMessage)
      return null
    }
  }, [])

  // Calculate distance between two points
  const calculateDistance = useCallback((lat1: number, lon1: number, lat2: number, lon2: number): number => {
    console.log('[useWalking] Calculating distance between', { lat1, lon1 }, 'and', { lat2, lon2 })
    const R = 6371 // Radius of the earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a
      = Math.sin(dLat / 2) * Math.sin(dLat / 2)
        + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180)
        * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c // Distance in km
    console.log('[useWalking] Calculated distance:', distance, 'km')
    return distance
  }, [])

  // Save the current distance to the backend
  const saveDistance = useCallback((finished: boolean = false) => {
    console.log('[useWalking] Saving distance:', { todayDistance, finished })
    if (!userId) {
      console.warn('[useWalking] Cannot save distance: No user ID')
      return
    }

    setIsSaving(true)
    const distanceInMeters = Math.round(todayDistance * 1000) // Convert km to meters for storage
    console.log('[useWalking] Saving distance in meters:', distanceInMeters)

    createWalking({
      userId,
      currentValue: distanceInMeters,
      date: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD
      finished,
    }, {
      onSettled: () => {
        console.log('[useWalking] Save distance settled')
        setIsSaving(false)
        if (finished) {
          console.log('[useWalking] Finishing session after save')
          finishSession() // Reset the timer when walk is saved as finished
        }
      },
    })
  }, [userId, todayDistance, createWalking, finishSession])

  // Finish walking - save with finished=true
  const finishWalking = useCallback(() => {
    console.log('[useWalking] Finishing walking')
    stopTimer()
    saveDistance(true)
    handleDrawerOpen(false)
  }, [stopTimer, saveDistance, handleDrawerOpen])

  // Update user gems when watching ads
  const { mutate: updateUser, isPending: isUpdateUserLoading } = useUpdateUser({
    onSuccess: () => {
      console.log('[useWalking] User gems updated successfully')
      finishWalking() // Save the walking data after gems are updated
    },
    onError: (error) => {
      console.error('[useWalking] Error updating user gems:', error)
      toast.error('Что-то пошло не так!')
    },
  })

  // Handle updating user gems
  const updateUserGems = useCallback(() => {
    console.log('[useWalking] Updating user gems')
    if (!user) {
      console.warn('[useWalking] Cannot update gems: No user')
      return
    }
    const newGems = user.gems + GEMS_TO_ADD
    console.log('[useWalking] New gems total:', newGems)
    updateUser({ userId: user.id, gems: newGems })
  }, [user, updateUser])

  // Handle finishing walk with ads
  const finishWalkingWithAds = useCallback(async () => {
    console.log('[useWalking] Finishing walking with ads')
    setAdsState({ isLoading: true, isSuccess: false, error: null })
    try {
      console.log('[useWalking] Showing native ads')
      const response = await vkBridge.send('VKWebAppShowNativeAds', {
        // eslint-disable-next-line ts/ban-ts-comment
        // @ts-ignore
        ad_format: 'reward',
      })
      console.log('[useWalking] Ad response:', response)

      if (!response.result) {
        console.error('[useWalking] Ad failed to show')
        throw new Error('Ошибка при показе рекламы')
      }

      console.log('[useWalking] Ad shown successfully')
      setAdsState({ isLoading: false, isSuccess: true, error: null })
      updateUserGems()
    }
    catch (error) {
      console.error('[useWalking] Ad error:', error)
      toast.error('Что-то пошло не так!')
      finishSession()
      setAdsState({ isLoading: false, isSuccess: false, error: null })
      handleDrawerOpen(false)
    }
  }, [updateUserGems, finishSession, handleDrawerOpen])

  // Start tracking and timer
  const startTracking = useCallback(() => {
    console.log('[useWalking] Starting tracking')
    startTimer()
  }, [startTimer])

  // Pause tracking and timer
  const stopTracking = useCallback(() => {
    console.log('[useWalking] Stopping tracking')
    stopTimer()
  }, [stopTimer])

  // Show finish drawer when timer is complete
  useEffect(() => {
    console.log('[useWalking] Timer finished state changed:', isTimerFinished)
    if (isTimerFinished) {
      console.log('[useWalking] Timer finished, opening drawer')
      handleDrawerOpen(true)
    }
  }, [isTimerFinished])

  // Initialize data from backend when walkings data is loaded
  useEffect(() => {
    console.log('[useWalking] Walkings data effect triggered')
    if (!walkings) {
      console.log('[useWalking] No walkings data yet')
      return
    }

    const todayRecord = getTodayWalking(walkings)
    console.log('[useWalking] Today\'s walking record:', todayRecord)

    if (todayRecord) {
      // Get the ID from the matching record
      const matchingRecord = walkings.find(w => w.date === todayRecord.date)
      console.log('[useWalking] Matching record:', matchingRecord)

      if (matchingRecord && 'id' in matchingRecord) {
        const recordId = (matchingRecord as any).id
        console.log('[useWalking] Setting today\'s walking ID:', recordId)
        setTodayWalkingId(recordId)
      }

      // Set today's distance (convert from meters to kilometers)
      const distanceInKm = todayRecord.currentValue / 1000
      console.log('[useWalking] Setting today\'s distance:', distanceInKm, 'km')
      setTodayDistance(distanceInKm)
    }
    else {
      console.log('[useWalking] No walking record for today, resetting distance')
      setTodayDistance(0)
    }

    // Calculate total distance from all records (convert from meters to kilometers)
    const total = walkings.reduce((sum, record) => sum + record.currentValue, 0) / 1000
    console.log('[useWalking] Total distance calculated:', total, 'km')
    setTotalDistance(total)
  }, [walkings])

  // Cleanup effect
  useEffect(() => {
    console.log('[useWalking] Setting up cleanup effect')
    return () => {
      console.log('[useWalking] Component unmounting')
      isMountedRef.current = false
    }
  }, [])

  // Effect to track position when timer is running
  useEffect(() => {
    console.log('[useWalking] Position tracking effect triggered, timer running:', isTimerRunning)
    if (!isTimerRunning) {
      console.log('[useWalking] Timer not running, skipping position tracking')
      return
    }

    const trackPosition = async () => {
      console.log('[useWalking] Tracking position...')
      const newPosition = await getRealGeoPosition()
      console.log('[useWalking] New position received:', newPosition)

      if (!isMountedRef.current) {
        console.log('[useWalking] Component unmounted, stopping position tracking')
        return
      }

      if (!newPosition) {
        console.warn('[useWalking] No position data received')
        return
      }

      if (isMountedRef.current) {
        console.log('[useWalking] Adding position to history')
        setPositions(prev => [...prev, newPosition])
      }

      const currentLastPosition = lastPositionRef.current
      console.log('[useWalking] Previous position:', currentLastPosition)

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
        console.log('[useWalking] Distance since last position:', distance, 'km')

        if (distance > MIN_DISTANCE_THRESHOLD && distance < MAX_DISTANCE_THRESHOLD) {
          console.log('[useWalking] Valid movement detected, updating distance')
          if (isMountedRef.current) {
            setTodayDistance((prev) => {
              const newDist = prev + distance
              console.log('[useWalking] New today distance:', newDist, 'km')
              return newDist
            })
            setTotalDistance((prev) => {
              const newDist = prev + distance
              console.log('[useWalking] New total distance:', newDist, 'km')
              return newDist
            })
            setIsWalking(true)
          }
        }
        else {
          console.log('[useWalking] Movement outside threshold range:', {
            distance,
            min: MIN_DISTANCE_THRESHOLD,
            max: MAX_DISTANCE_THRESHOLD,
          })
          if (isMountedRef.current) {
            setIsWalking(false)
          }
        }
      }
    }

    trackPosition()
    console.log('[useWalking] Setting up position tracking interval:', trackingInterval, 'ms')

    const intervalId = window.setInterval(trackPosition, trackingInterval)

    return () => {
      console.log('[useWalking] Cleaning up position tracking interval')
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
  console.log('[useWalking] Button text:', buttonText)

  // Calculate if ad or finish button is loading
  const isFinishingWithAdsLoading = adsState.isLoading || isUpdateUserLoading || isCreatingWalking
  const isFinishingLoading = isCreatingWalking
  console.log('[useWalking] Button loading states:', { isFinishingWithAdsLoading, isFinishingLoading })

  console.log('[useWalking] Returning hook values')
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
  console.log('[getTodayWalking] Finding today\'s walking record from', walkings?.length, 'records')
  const today = new Date().toISOString().split('T')[0] // Format as YYYY-MM-DD
  console.log('[getTodayWalking] Today\'s date:', today)
  const result = walkings.find(walking => walking.date === today)
  console.log('[getTodayWalking] Found record:', result)
  return result
}
