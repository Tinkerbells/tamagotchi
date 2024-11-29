import { uniqueIndex } from 'drizzle-orm/mysql-core'
import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const user = pgTable('user', {
  id: serial('id').primaryKey(),
  vkId: varchar('vk_id', { length: 255 }).notNull().unique(),
  first_name: varchar('first_name', { length: 50 }).notNull(),
  last_name: varchar('last_name', { length: 50 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const selectUserSchema = createSelectSchema(user)

export const insertUserSchema = createInsertSchema(user, {
  first_name: (schema) => schema.first_name.min(1).max(50),
  last_name: (schema) => schema.last_name.min(1).max(50),
})
  .required({ first_name: true, last_name: true, vkId: true })
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
