import { water } from '@tamagotchi/api/hc'

export type WaterType = Omit<
  typeof water.$inferSelect,
  'createdAt' | 'updatedAt'
> & {
  createdAt: string
  updatedAt: string
}

export type FetchedWater = WaterType[]

export type UpdateWaterDto = {
  currentValue: WaterType['currentValue']
}
