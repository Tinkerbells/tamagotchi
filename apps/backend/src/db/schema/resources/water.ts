import { user } from '../user'
import { norms } from './norms'
import { pgTable, serial, integer, date, timestamp } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const water = pgTable('water', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => user.id),
  currentValue: integer('current_value').default(0).notNull(),
  date: date('date').defaultNow().notNull().unique(),
  dailyNorm: integer('daily_norm').references(() => norms.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const selectWaterSchema = createSelectSchema(water, {})

export const insertWaterSchema = createInsertSchema(water)
  .required({ userId: true, date: true })
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
