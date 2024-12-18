import { getShopSchema } from '@tamagotchi/api/hc'
import { z } from 'zod'

export type Shop = z.infer<typeof getShopSchema>
export type AccessoriesType = Pick<Shop, 'accessories'>['accessories']
export type InteriorItemsType = Pick<Shop, 'interior_items'>['interior_items']
