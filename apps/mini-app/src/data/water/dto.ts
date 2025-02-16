import type { water } from '@tamagotchi/api/hc'

export type WaterType = Omit<
  typeof water.$inferSelect,
  'createdAt' | 'updatedAt'
> & {
  createdAt: string
  updatedAt: string
}

export type FetchedWater = WaterType[]

export interface UpdateWaterDto {
  currentValue: WaterType['currentValue']
}
