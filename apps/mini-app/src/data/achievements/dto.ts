import type { achievements } from '@tamagotchi/api/hc'

export type Achievement = typeof achievements.$inferSelect & {
  isUnlocked?: boolean
}

export type Achievements = Achievement[]
