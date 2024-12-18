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

export const walking = pgTable('walking', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => user.id),
  currentValue: integer('current_value').default(0).notNull(),
  date: date('date').notNull().unique(),
  finished: boolean('finished').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const selectWalkingSchema = createSelectSchema(walking, {
  createdAt: z.string().transform((value) => new Date(value).toISOString()),
  updatedAt: z.string().transform((value) => new Date(value).toISOString()),
})

export const insertWalkingSchema = createInsertSchema(walking)
  .required({ userId: true, date: true })
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
