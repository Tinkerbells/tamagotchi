import { pgTable, serial, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const achievements = pgTable('achievements', {
  id: serial('id').primaryKey(),
  title: varchar('title').notNull(),
  description: varchar('description').notNull(),
  icon: varchar('icon').notNull(),
})

export const selectAchievementsSchema = createSelectSchema(achievements)

export const insertAchievementsSchema = createInsertSchema(achievements, {
  title: (schema) => schema.title.min(1).max(255),
  description: (schema) => schema.description.min(1).max(500),
  icon: (schema) => schema.icon.url(), // Ensuring the icon field is a valid URL
})
  .required({ title: true, description: true, icon: true })
  .omit({
    id: true,
  })
