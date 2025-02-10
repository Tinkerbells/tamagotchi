import { user } from '../user'
import { pgTable, serial, integer, timestamp, date } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const sleep = pgTable('sleep', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => user.id),
  currentValue: integer('current_value').default(0).notNull(),
  date: date('date').defaultNow().notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const selectSleepSchema = createSelectSchema(sleep, {})

export const insertSleepSchema = createInsertSchema(sleep)
  .required({ currentValue: true, userId: true })
  .omit({
    id: true,
    date: true,
    createdAt: true,
    updatedAt: true,
  })
