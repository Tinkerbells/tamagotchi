import { pgTable, serial, varchar, integer } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

export const ACCESSORIES_ENUM = {
  angel: 0,
  pirate: 1,
  witch: 2,
  santa: 3,
  king: 4,
  birthday: 5,
  cook: 6,
  joker: 7,
} as const

export type AccessoryType =
  (typeof ACCESSORIES_ENUM)[keyof typeof ACCESSORIES_ENUM]

export const accessories = pgTable('accessories', {
  id: serial('id').primaryKey(),
  title: varchar('name', { length: 100 }).notNull(),
  price: integer('price').notNull(),
  type: integer('item_type').notNull(),
})

export const selectAccessoriesSchema = createSelectSchema(accessories)

export const insertAccessoriesSchema = createInsertSchema(accessories, {
  title: (schema) => schema.title.min(1).max(100),
  price: (schema) => schema.price.min(0),
  type: () => z.nativeEnum(ACCESSORIES_ENUM),
}).required({ title: true, price: true })
