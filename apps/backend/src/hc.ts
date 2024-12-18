import { AppType } from './app'
import { hc } from 'hono/client'

export * from '@/db/schema'
export { getShopSchema } from '@/routes/shop/shop.routes'
export { getPetSchema } from '@/routes/pet/pet.routes'

const client = hc<AppType>('')
export type Client = typeof client

export const hcWithType = (...args: Parameters<typeof hc>): Client =>
  hc<AppType>(...args)
