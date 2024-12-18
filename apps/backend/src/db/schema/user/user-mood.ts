import { user } from './user'
import { integer, pgTable, serial, timestamp } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const userMood = pgTable('user_mood', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => user.id)
    .notNull(),
  moodStatus: integer('mood_status').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const selectUserMoodSchema = createSelectSchema(userMood)

export const insertUserMoodSchema = createInsertSchema(userMood)
  .required({ moodStatus: true })
  .omit({
    id: true,
    createdAt: true,
    userId: true,
  })
