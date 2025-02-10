import {
  purchasedInteriorItems,
  purchasedAccessories,
  pet,
} from '@tamagotchi/api/hc'

export type PetAccessoryType = Omit<
  typeof purchasedAccessories.$inferSelect,
  'purchasedAt'
> & {
  purchasedAt: string | null
}

export type PetInteriorItemType = Omit<
  typeof purchasedInteriorItems.$inferSelect,
  'purchasedAt'
> & {
  purchasedAt: string | null
}

export type Pet = typeof pet.$inferSelect

export type PetDto = {
  pet: Pet
  accessory?: PetAccessoryType
  interior_items?: PetInteriorItemType[]
}
