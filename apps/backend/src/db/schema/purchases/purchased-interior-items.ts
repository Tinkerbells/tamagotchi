import { INTERIOR_ITEMS_ENUM, interiorItems } from '../common'
import { user } from '../user/user'
import {
  pgTable,
  serial,
  integer,
  timestamp,
  boolean,
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

export const purchasedInteriorItems = pgTable('purchased_interior_items', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => user.id),
  itemId: integer('item_id')
    .references(() => interiorItems.id)
    .unique(),
  isActive: boolean('is_active').default(false),
  purchasedAt: timestamp('purchased_at').defaultNow(),
  type: integer('item_type').notNull(),
})

export const selectPurchasedInteriorItemsSchema = createSelectSchema(
  purchasedInteriorItems
)

export const insertPurchasedInteriorItemsSchema = createInsertSchema(
  purchasedInteriorItems,
  {
    type: () => z.nativeEnum(INTERIOR_ITEMS_ENUM),
  }
)
  .required({
    userId: true,
    itemId: true,
  })
  .omit({ id: true, purchasedAt: true, isActive: true })
