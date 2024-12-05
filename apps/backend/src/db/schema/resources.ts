import { user } from './user'
import { integer, pgTable, serial } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const resources = pgTable('resources', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => user.id),
  gratitude: integer('gratitude').default(0),
  food: integer('food').default(0),
  water: integer('water').default(0),
  sleep: integer('sleep').default(0),
  meditation: integer('meditation').default(0),
  walking: integer('walking').default(0),
})

export const selectResourcesSchema = createSelectSchema(resources)

export const insertResourcesSchema = createInsertSchema(resources)
  .required({ userId: true })
  .omit({
    id: true,
  })

export const updateResourcesSchema = createInsertSchema(resources)
  .required({ userId: true })
  .omit({
    id: true,
    userId: true,
  })
