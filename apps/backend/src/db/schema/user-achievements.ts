import { achievements } from './achievements'
import { user } from './user'
import { integer, pgTable, serial, timestamp } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const userAchievements = pgTable('user_achievements', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => user.id),
  achievementId: integer('achievement_id')
    .notNull()
    .references(() => achievements.id),
  createdAt: timestamp('created_at').defaultNow(),
})

export const selectUserAchievementsSchema = createSelectSchema(userAchievements)

export const insertUserAchievementsSchema = createInsertSchema(userAchievements)
  .required({ userId: true, achievementId: true })
  .omit({
    id: true,
    createdAt: true,
  })
