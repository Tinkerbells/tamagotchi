import { user } from '../user'
import {
  pgTable,
  serial,
  integer,
  timestamp,
  date,
  boolean,
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

export const meditation = pgTable('meditation', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => user.id),
  date: date('date').notNull().unique(),
  finished: boolean('finished').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const selectMeditationSchema = createSelectSchema(meditation, {
  createdAt: z.string().transform((value) => new Date(value).toISOString()),
  updatedAt: z.string().transform((value) => new Date(value).toISOString()),
})

export const insertMeditationSchema = createInsertSchema(meditation)
  .required({ userId: true, date: true })
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
