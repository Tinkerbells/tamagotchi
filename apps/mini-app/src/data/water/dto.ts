import { water } from '@tamagotchi/api/hc'

type WaterType = Omit<
  typeof water.$inferSelect,
  'createdAt' | 'updatedAt' | 'dailyNorm'
> & {
  createdAt: string
  updatedAt: string
  dailyNorm: number | null
}

export type FetchedWater = WaterType[]
