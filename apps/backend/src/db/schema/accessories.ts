import { pgTable, serial, varchar, decimal } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const accessories = pgTable('accessories', {
  id: serial('id').primaryKey(),
  title: varchar('name', { length: 100 }).notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  image: varchar('image').notNull(),
})

export const selectAccessoriesSchema = createSelectSchema(accessories)

export const insertAccessoriesSchema = createInsertSchema(accessories, {
  title: (schema) => schema.title.min(1).max(100),
  price: (schema) => schema.price.min(0),
})
  .required({ title: true, price: true, image: true })
  .omit({ id: true })
