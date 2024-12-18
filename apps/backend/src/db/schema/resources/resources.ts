import { selectGratitudeSchema } from './gratitude'
import { selectMealSchema } from './meal'
import { selectMeditationSchema } from './meditation'
import { selectSleepSchema } from './sleep'
import { selectWalkingSchema } from './walking'
import { selectWaterSchema } from './water'
import { z } from 'zod'

export const selectResourcesSchema = z.object({
  meal: selectMealSchema,
  water: selectWaterSchema,
  meditation: selectMeditationSchema,
  gratitude: z.array(selectGratitudeSchema),
  walking: selectWalkingSchema,
  sleep: selectSleepSchema,
})
