import { gratitude } from '@tamagotchi/api/hc'

export type GratitudeType = Omit<
  typeof gratitude.$inferSelect,
  'createdAt' | 'updatedAt'
> & {
  createdAt: string
  updatedAt: string
}

export type FetchedGratitudes = GratitudeType[]

// export type UpdateMeal = typeof gratitude.$inferInsert
