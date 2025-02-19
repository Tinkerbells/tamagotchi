import { integer, pgTable, smallint, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const vkUser = pgTable('vk_user', {
  id: integer('id').primaryKey(),
  first_name: varchar('first_name'),
  last_name: varchar('last_name'),
  sex: smallint('sex'),
  city: varchar('city'),
  country: varchar('country'),
  bdate: varchar('bdate',), 
  photo_100: varchar('photo_100'),
  photo_200: varchar('photo_200'),
  photo_max_orig: varchar('photo_max_orig'),
  timezone: smallint('timezone'),
})

export const selectVkUserSchema = createSelectSchema(vkUser)

export const insertVkUserSchema = createInsertSchema(vkUser)
