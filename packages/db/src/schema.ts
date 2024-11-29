import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const user = pgTable('user', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull(),
  email: varchar('email', { length: 100 }).notNull().unique(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const selectUserSchema = createSelectSchema(user)

export const insertUserSchema = createInsertSchema(user, {
  name: (schema) => schema.name.min(1).max(50),
  email: (schema) => schema.email.email(),
})
  .required({ email: true, name: true })
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
