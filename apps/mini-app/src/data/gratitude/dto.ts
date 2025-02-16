import type { gratitude } from '@tamagotchi/api/hc'

export type GratitudeType = Omit<
  typeof gratitude.$inferSelect,
  'createdAt' | 'updatedAt'
> & {
  createdAt: string
  updatedAt: string
}

export type GratitudeId = string

export type FetchedGratitudes = GratitudeType[]
