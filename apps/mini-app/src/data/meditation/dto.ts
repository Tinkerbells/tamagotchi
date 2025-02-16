import type { meditation } from '@tamagotchi/api/hc'

export type MeditationType = Omit<
  typeof meditation.$inferSelect,
  'createdAt' | 'updatedAt'
> & {
  createdAt: string
  updatedAt: string
}

export type MeditationId = string

export type FetchedMeditations = MeditationType[]
