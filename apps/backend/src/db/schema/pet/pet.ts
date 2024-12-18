import { user } from '../user/user'
import { pgTable, serial, varchar, date, integer } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const pet = pgTable('pet', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull(),
  userId: integer('user_id')
    .notNull()
    .references(() => user.id)
    .unique(),
  createdDate: date('created_date').defaultNow(),
  updatedDate: date('updated_date').defaultNow(),
})

export const selectPetSchema = createSelectSchema(pet)

export const insertPetSchema = createInsertSchema(pet, {
  name: (schema) => schema.name.min(1).max(50),
})
  .required({ name: true, userId: true })
  .omit({
    id: true,
    updatedDate: true,
    createdDate: true,
  })

export const updatePetSchema = createInsertSchema(pet, {
  name: (schema) => schema.name.min(1).max(50).optional(),
})
  .required({ name: true, userId: true })
  .omit({
    id: true,
    userId: true,
    updatedDate: true,
    createdDate: true,
  })
