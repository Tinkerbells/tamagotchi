import { selectGratitudeSchema } from './gratitude'
import { selectMealSchema } from './meal'
import { selectMeditationSchema } from './meditation'
import { selectSleepSchema } from './sleep'
import { selectWalkingSchema } from './walking'
import { selectWaterSchema } from './water'
import { z } from 'zod'

export const selectResourcesSchema = z.object({
  meal: selectMealSchema.optional(),
  water: selectWaterSchema.optional(),
  meditation: selectMeditationSchema.optional(),
  gratitude: z.array(selectGratitudeSchema).optional(),
  walking: selectWalkingSchema.optional(),
  sleep: selectSleepSchema.optional(),
})

export const getResourcesSchema = z.object({
  meal: z.number(),
  water: z.number(),
  meditation: z.number(),
  gratitude: z.number(),
  walking: z.number(),
  sleep: z.number(),
})

export const getResourcesStatisticsSchema = getResourcesSchema.omit({
  meal: true,
  water: true,
  sleep: true,
})
