import type { z } from 'zod'
import type {
  getResourcesSchema,
  getResourcesStatisticsSchema,
  norms,
  updateNormsSchema,
} from '@tamagotchi/api/hc'

export type FetchedResources = z.infer<typeof getResourcesSchema>
export type FetchedStatistics = z.infer<typeof getResourcesStatisticsSchema>
export type ConvertedStatistics = Omit<
  z.infer<typeof getResourcesStatisticsSchema>,
  'meditation'
> & { meditation: string }

export const moodStates = {
  veryBored: 'very_bored', // Айзек очень скучает
  bored: 'bored', // Айзек скучает
  happy: 'happy', // Айзек радостный
  veryHappy: 'very_happy', // Айзек очень радостный
} as const

export type MoodType = (typeof moodStates)[keyof typeof moodStates]

export type UpdateNormsDto = z.infer<typeof updateNormsSchema>

export type FetchedNorms = typeof norms.$inferSelect
