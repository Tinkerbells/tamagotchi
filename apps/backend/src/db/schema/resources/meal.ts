import { user } from '../user'
import {
  pgTable,
  serial,
  integer,
  timestamp,
  boolean,
  date,
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

export const meal = pgTable('meal', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => user.id),
  date: date('date').notNull().unique(),
  breakfast: boolean('breakfast').default(false),
  lunch: boolean('lunch').default(false),
  dinner: boolean('dinner').default(false),
  snack: boolean('snack').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const selectMealSchema = createSelectSchema(meal, {
  createdAt: z.string().transform((value) => new Date(value).toISOString()),
  updatedAt: z.string().transform((value) => new Date(value).toISOString()),
})

export const insertMealSchema = createInsertSchema(meal)
  .required({ userId: true, date: true })
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
