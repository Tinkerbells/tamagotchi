import {
  purchasedInteriorItems,
  purchasedAccessories,
  pet,
} from '@tamagotchi/api/hc'

export type PetAccessory = Omit<
  typeof purchasedAccessories.$inferSelect,
  'purchasedAt'
> & {
  purchasedAt: string | null
}

export type PetInteriorItems = Omit<
  typeof purchasedInteriorItems.$inferSelect,
  'purchasedAt'
> & {
  purchasedAt: string | null
}

export type Pet = typeof pet.$inferSelect

export type PetDto = {
  pet: Pet
  accessory?: PetAccessory
  interior_items?: PetInteriorItems[]
}
