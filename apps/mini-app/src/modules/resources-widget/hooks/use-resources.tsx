import { useEffect } from 'react'

import { useAuth } from '@/shared'
import { useGetResources } from '@/data'

import { useMoodStore } from '../store'
import { getMood } from '../utils/get-mood'

export function useResources() {
  const { user } = useAuth()
  const { data: resources, isLoading } = useGetResources({ userId: user.id })
  const { setMood } = useMoodStore()

  useEffect(() => {
    if (resources) {
      setMood(getMood(resources))
    }
  }, [resources])

  return {
    resources,
    isLoading,
  }
}
