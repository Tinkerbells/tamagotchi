import type { GetRoute, UpdateRoute } from './store.routes'
import { db } from '@/db'
import {
  accessories,
  interiorItems,
  petAccessories,
  petInteriorItems,
} from '@/db/schema'
import { ZOD_ERROR_CODES, ZOD_ERROR_MESSAGES } from '@/lib/constants'
import type { AppRouteHandler } from '@/lib/types'
import { sql } from 'drizzle-orm'
import * as HttpStatusCodes from 'stoker/http-status-codes'

export const get: AppRouteHandler<GetRoute> = async (c) => {
  const { id } = c.req.valid('param')
  const accessoriesWithPurchased = await db
    .select({
      id: accessories.id,
      title: accessories.title,
      price: accessories.price,
      image: accessories.image,
      isPurchased: sql<boolean>`CASE WHEN ${petAccessories.id} IS NOT NULL THEN true ELSE false END`,
    })
    .from(accessories)
    .leftJoin(
      petAccessories,
      sql`${accessories.id} = ${petAccessories.accessoryId} AND ${petAccessories.userId} = ${id}`
    )
  const interiorItemsWithPurchased = await db
    .select({
      id: interiorItems.id,
      title: interiorItems.title,
      price: interiorItems.price,
      image: interiorItems.image,
      type: interiorItems.type,
      isPurchased: sql<boolean>`CASE WHEN ${petInteriorItems.id} IS NOT NULL THEN true ELSE false END`,
    })
    .from(interiorItems)
    .leftJoin(
      petInteriorItems,
      sql`${interiorItems.id} = ${petInteriorItems.interiorItemsId} AND ${petInteriorItems.userId} = ${id}`
    )

  return c.json(
    {
      accessories: accessoriesWithPurchased,
      interior_items: interiorItemsWithPurchased,
    },

    HttpStatusCodes.OK
  )
}
