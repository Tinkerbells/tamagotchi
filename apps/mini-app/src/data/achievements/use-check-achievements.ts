import type { MutationOptions } from '@tanstack/react-query'

import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { client, useConfetti } from '@/shared'

import type { UserId } from '../user'
import type { Achievement } from './dto'

import { GET_ACHIEVEMENTS_QUERY_KEY } from './use-get-achievements'

interface CheckAchievementsResponse {
  achievements: Achievement[]
  newlyEarned?: Achievement[]
}

interface CheckAchievementsParams {
  userId: UserId
}

async function checkAchievements(params: CheckAchievementsParams): Promise<CheckAchievementsResponse> {
  try {
    const response = await client.achievements.check[':id'].$post({
      param: { id: params.userId.toString() },
    })

    if (!response.ok) {
      const error = new Error(
        `Failed to check achievements: ${response.status} ${response.statusText}`,
      )
      error.name = 'CheckAchievementsError'
      throw error
    }

    const result = await response.json()
    return result
  }
  catch (error) {
    console.error('Error checking achievements:', error)
    throw error
  }
}

export function useCheckAchievements(options?: Omit<
  MutationOptions<CheckAchievementsResponse, Error, CheckAchievementsParams, unknown>,
  'mutationFn'
>) {
  const queryClient = useQueryClient()
  const confetti = useConfetti()

  return useMutation({
    mutationFn: (params: CheckAchievementsParams) => checkAchievements(params),
    onSuccess: async (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: GET_ACHIEVEMENTS_QUERY_KEY })

      if (data.newlyEarned && data.newlyEarned.length > 0) {
        confetti()

        data.newlyEarned.forEach((achievement) => {
          toast.success(`🎉 Новое достижение: ${achievement.title}!`, {
            duration: 5000,
            icon: achievement.icon,
          })
        })
      }

      options?.onSuccess?.(data, variables, context)
    },
    onError: (error) => {
      console.error('Error checking achievements:', error)
      toast.error('Не удалось проверить достижения')
    },
    ...options,
  })
}
