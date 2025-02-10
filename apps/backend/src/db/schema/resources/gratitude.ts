import { user } from '../user'
import {
  pgTable,
  serial,
  integer,
  text,
  timestamp,
  date,
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const gratitude = pgTable('gratitude', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => user.id),
  date: date('date').defaultNow().notNull(),
  message: text('message').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const selectGratitudeSchema = createSelectSchema(gratitude, {})

export const insertGratitudeSchema = createInsertSchema(gratitude)
  .required({ userId: true, message: true })
  .omit({
    id: true,
    date: true,
    createdAt: true,
    updatedAt: true,
  })

