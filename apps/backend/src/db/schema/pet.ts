import { accessories } from './accessories'
import { user } from './user'
import { pgTable, serial, varchar, date, integer } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const pet = pgTable('pet', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  accessoryId: integer('accessory_id').references(() => accessories.id), // Current accessory
  userId: integer('user_id')
    .notNull()
    .references(() => user.id)
    .unique(),
  createdDate: date('created_date').defaultNow(),
  updatedDate: date('updated_date').defaultNow(),
})

export const selectPetSchema = createSelectSchema(pet)

export const insertPetSchema = createInsertSchema(pet, {
  name: (schema) => schema.name.min(1).max(255),
})
  .required({ name: true, userId: true })
  .omit({
    id: true,
    updatedDate: true,
    createdDate: true,
  })
