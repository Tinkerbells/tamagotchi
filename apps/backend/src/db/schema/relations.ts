import { accessories } from './accessories'
import { achievements } from './achievements'
import { interiorItems } from './interior-items'
import { pet } from './pet'
import { petAccessories } from './pet-accessories'
import { petInteriorItems } from './pet-interior-items'
import { user } from './user'
import { userAchievements } from './user-achievements'
import { relations } from 'drizzle-orm'

export const userAchievementsRelations = relations(
  userAchievements,
  ({ one }) => ({
    achievements: one(achievements, {
      fields: [userAchievements.achievementId],
      references: [achievements.id],
    }),
    user: one(user, {
      fields: [userAchievements.userId],
      references: [user.id],
    }),
  })
)

// export const petAccessoriesRelations = relations(petAccessories, ({ one }) => ({
//   pet: one(pet, {
//     fields: [petAccessories.userId],
//     references: [user.id],
//   }),
//   accessories: one(accessories, {
//     fields: [petAccessories.accessoryId],
//     references: [accessories.id],
//   }),
// }))
//
// export const petInteriorItemsRelations = relations(
//   petInteriorItems,
//   ({ one }) => ({
//     pet: one(pet, {
//       fields: [petInteriorItems.petId],
//       references: [pet.id],
//     }),
//     interiorItems: one(interiorItems, {
//       fields: [petInteriorItems.interiorItemsId],
//       references: [interiorItems.id],
//     }),
//   })
// )
