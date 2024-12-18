import { user } from '../user'
import { pgTable, serial, integer, text, timestamp } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

export const gratitude = pgTable('gratitude', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => user.id),
  message: text('message').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const selectGratitudeSchema = createSelectSchema(gratitude, {
  createdAt: z.string().transform((value) => new Date(value).toISOString()),
  updatedAt: z.string().transform((value) => new Date(value).toISOString()),
})

export const insertGratitudeSchema = createInsertSchema(gratitude)
  .required({ userId: true })
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
