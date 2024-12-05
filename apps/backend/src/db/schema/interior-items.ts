import { pgTable, serial, varchar, integer, decimal } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const interiorItems = pgTable('interior_items', {
  id: serial('id').primaryKey(),
  title: varchar('name', { length: 100 }).notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  image: varchar('image').notNull(),
  type: integer('item_type').notNull(),
})

export const selectInteriorItemsSchema = createSelectSchema(interiorItems)

export const insertInteriorItemsSchema = createInsertSchema(interiorItems, {
  title: (schema) => schema.title.min(1).max(100),
  price: (schema) => schema.price.min(0),
})
  .required({ title: true, price: true, image: true })
  .omit({ id: true })
