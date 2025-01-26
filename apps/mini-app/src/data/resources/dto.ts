import {
  getResourcesSchema,
  getResourcesStatisticsSchema,
} from '@tamagotchi/api/hc'
import { z } from 'zod'

export type FetchedResources = z.infer<typeof getResourcesSchema>
export type FetchedStatistics = z.infer<typeof getResourcesStatisticsSchema>

export const moodStates = {
  veryBored: 'very_bored', // Айзек очень скучает
  bored: 'bored', // Айзек скучает
  happy: 'happy', // Айзек радостный
  veryHappy: 'very_happy', // Айзек очень радостный
} as const

export type MoodType = (typeof moodStates)[keyof typeof moodStates]
