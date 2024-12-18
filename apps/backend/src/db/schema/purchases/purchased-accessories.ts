import { accessories, ACCESSORIES_ENUM } from '../common'
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

export const purchasedAccessories = pgTable('purchased_accessories', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => user.id),
  itemId: integer('item_id')
    .references(() => accessories.id)
    .unique(),
  isActive: boolean('is_active').default(false),
  purchasedAt: timestamp('purchased_at').defaultNow(),
  type: integer('item_type').notNull(),
})

export const selectPurchasedAccessoriesSchema =
  createSelectSchema(purchasedAccessories)

export const insertPurchasedAccessoriesSchema = createInsertSchema(
  purchasedAccessories,
  {
    type: () => z.nativeEnum(ACCESSORIES_ENUM), // Use zod's nativeEnum to validate HatType
  }
)
  .required({
    userId: true,
    itemId: true,
  })
  .omit({ id: true, purchasedAt: true, isActive: true })
