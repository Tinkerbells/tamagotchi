import { meal } from '@tamagotchi/api/hc'

export type MealType = Omit<
  typeof meal.$inferSelect,
  'createdAt' | 'updatedAt'
> & {
  createdAt: string
  updatedAt: string
}

export type FetchedMeals = MealType[]

export type UpdateMeal = typeof meal.$inferInsert
