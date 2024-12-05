import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const user = pgTable('user', {
  id: serial('id').primaryKey(),
  vkId: varchar('vk_id', { length: 255 }).notNull().unique(),
  firstName: varchar('first_name', { length: 50 }).notNull(),
  lastName: varchar('last_name', { length: 50 }).notNull(),
  gems: integer('gems').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const selectUserSchema = createSelectSchema(user)

export const insertUserSchema = createInsertSchema(user, {
  firstName: (schema) => schema.firstName.min(1).max(50),
  lastName: (schema) => schema.lastName.min(1).max(50),
}).required({ firstName: true, lastName: true, vkId: true })
