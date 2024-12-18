import { db } from '@/db'
import {
  accessories,
  interiorItems,
  purchasedAccessories,
  purchasedInteriorItems,
} from '@/db/schema'
import { sql } from 'drizzle-orm'

export const getItemsWithPurchasedStatus = async (
  userId: number,
  itemType: 'accessory' | 'interior'
) => {
  const items = itemType === 'accessory' ? accessories : interiorItems
  const purchasedItems =
    itemType === 'accessory' ? purchasedAccessories : purchasedInteriorItems

  return await db
    .select({
      id: items.id,
      title: items.title,
      price: items.price,
      type: items.type,
      isPurchased: sql<boolean>`CASE WHEN ${purchasedItems.id} IS NOT NULL THEN true ELSE false END`,
      isActive: sql<boolean | undefined>`CASE 
        WHEN ${purchasedItems.isActive} IS NULL THEN FALSE 
        ELSE ${purchasedItems.isActive}
      END`,
    })
    .from(items)
    .leftJoin(
      purchasedItems,
      sql`${items.id} = ${purchasedItems.itemId} 
           AND ${purchasedItems.userId} = ${userId}`
    )
    .orderBy(items.id)
}
