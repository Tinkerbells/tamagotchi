import { water } from '@tamagotchi/api/hc'

type WaterType = Omit<typeof water.$inferSelect, 'createdAt' | 'updatedAt'> & {
  createdAt: string
  updatedAt: string
}

export type FetchedWater = WaterType[]
