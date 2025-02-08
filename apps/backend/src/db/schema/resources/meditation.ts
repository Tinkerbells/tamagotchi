import { user } from '../user'
import { pgTable, serial, integer, timestamp, date } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const meditation = pgTable('meditation', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => user.id),
  date: date('date').defaultNow().notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const selectMeditationSchema = createSelectSchema(meditation, {})

export const insertMeditationSchema = createInsertSchema(meditation)
  .required({ userId: true })
  .omit({
    id: true,
    createdAt: true,
    date: true,
    updatedAt: true,
  })
