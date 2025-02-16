import type { z } from 'zod'
import type { getShopSchema } from '@tamagotchi/api/hc'

export type Shop = z.infer<typeof getShopSchema>
export type AccessoriesType = Pick<Shop, 'accessories'>['accessories']
export type InteriorItemsType = Pick<Shop, 'interior_items'>['interior_items']
