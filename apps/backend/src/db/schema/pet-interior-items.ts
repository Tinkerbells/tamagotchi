import { interiorItems } from './interior-items'
import { user } from './user'
import { pgTable, serial, integer, timestamp } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const petInteriorItems = pgTable('pet_interior_items', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => user.id),
  interiorItemsId: integer('interior_items_id').references(
    () => interiorItems.id
  ),
  purchasedAt: timestamp('purchased_at').defaultNow(),
})

export const selectPetInteriorItemsSchema = createSelectSchema(petInteriorItems)

export const insertPetInteriorItemsSchema = createInsertSchema(petInteriorItems)
  .required({
    userId: true,
  })
  .omit({ id: true, purchasedAt: true })
