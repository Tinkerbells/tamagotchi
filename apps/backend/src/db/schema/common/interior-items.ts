import { pgTable, serial, varchar, integer } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

export const INTERIOR_ITEMS_ENUM = {
  lamp: 0,
  cup: 1,
  cookies: 2,
  books: 3,
  garlands: 4,
  paintLandscape: 5,
  paintBird: 6,
  paintDog: 7,
  paintFlowers: 8,
  paintCat: 9,
} as const

export type InteriorType =
  (typeof INTERIOR_ITEMS_ENUM)[keyof typeof INTERIOR_ITEMS_ENUM]

export const interiorItems = pgTable('interior_items', {
  id: serial('id').primaryKey(),
  title: varchar('name', { length: 100 }).notNull(),
  price: integer('price').notNull(),
  type: integer('item_type').notNull(),
})

export const selectInteriorItemsSchema = createSelectSchema(interiorItems)

export const insertInteriorItemsSchema = createInsertSchema(interiorItems, {
  title: (schema) => schema.title.min(1).max(100),
  price: (schema) => schema.price.min(0),
  type: () => z.nativeEnum(INTERIOR_ITEMS_ENUM),
})
  .required({ title: true, price: true })
  .omit({ id: true })
