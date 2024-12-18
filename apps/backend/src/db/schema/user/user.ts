import { vkUser } from './vk-user'
import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

export const user = pgTable('user', {
  id: serial('id').primaryKey(),
  gems: integer('gems').default(0).notNull(),
  mood: integer('mood').default(0).notNull(),
  provider: varchar('provider').notNull(),
  vkId: integer('vk_id')
    .references(() => vkUser.id)
    .unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const selectUserSchema = createSelectSchema(user)

export const insertUserSchema = createInsertSchema(user, {
  provider: () => z.enum(['vk', 'telegram']),
}).required({ provider: true })
