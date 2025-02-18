import { integer, pgTable, smallint, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const vkUser = pgTable('vk_user', {
  id: integer('id').primaryKey(),
  first_name: varchar('first_name').notNull(),
  last_name: varchar('last_name').notNull(),
  sex: smallint('sex').notNull(), // 0, 1, or 2
  city: varchar('city').notNull(), // JSON for { id, title }
  country: varchar('country').notNull(), // JSON for { id, title }
  bdate: varchar('bdate', { length: 255 }), // Optional string (e.g., "D.M.YYYY" or "D.M")
  photo_100: varchar('photo_100').notNull(),
  photo_200: varchar('photo_200').notNull(),
  photo_max_orig: varchar('photo_max_orig'),
  timezone: smallint('timezone'),
})

export const selectVkUserSchema = createSelectSchema(vkUser)

export const insertVkUserSchema = createInsertSchema(vkUser, {
  id: (schema) => schema.id.positive(), // Ensure `id` is a positive integer
})
