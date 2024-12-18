import { selectResourcesSchema } from '@tamagotchi/api/hc'
import { z } from 'zod'

export type FetchedResources = z.infer<typeof selectResourcesSchema>
