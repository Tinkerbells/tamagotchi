import { accessories } from './accessories'
import { user } from './user'
import { pgTable, serial, integer, timestamp } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const petAccessories = pgTable('pet_accessories', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => user.id),
  accessoryId: integer('accessory_id').references(() => accessories.id),
  purchasedAt: timestamp('purchased_at').defaultNow(),
})

export const selectPetAccessoriesSchema = createSelectSchema(petAccessories)

export const insertPetAccessoriesSchema = createInsertSchema(petAccessories)
  .required({
    userId: true,
    accessoryId: true,
  })
  .omit({ id: true, purchasedAt: true })
