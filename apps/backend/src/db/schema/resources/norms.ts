import { user } from '../user'
import { integer, pgTable, serial } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const norms = pgTable('norms', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => user.id),
  waterDailyNorm: integer('water_daily_norm').default(750).notNull(),
  sleepDailyNorm: integer('sleep_daily_norm').default(8).notNull(),
})

export const selectNormsSchema = createSelectSchema(norms)

export const insertNormsSchema = createInsertSchema(norms)
  .required({ userId: true })
  .omit({
    id: true,
  })

export const updateNormsSchema = createInsertSchema(norms)
  .required({ userId: true })
  .omit({
    id: true,
    userId: true,
  })
