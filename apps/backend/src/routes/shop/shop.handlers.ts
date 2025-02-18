import type {
  UpdateInteriorItemsRoute,
  GetRoute,
  PurchaseRoute,
  UpdateAccessoryRoute,
} from './shop.routes'
import { getItemsWithPurchasedStatus } from './utils'
import { db } from '@/db'
import { purchasedAccessories, purchasedInteriorItems, user } from '@/db/schema'
import type { AppRouteHandler } from '@/lib/types'
import { eq } from 'drizzle-orm'
import * as HttpStatusCodes from 'stoker/http-status-codes'

export const get: AppRouteHandler<GetRoute> = async (c) => {
  const { id } = c.req.valid('param')
  const accessoriesWithPurchased = await getItemsWithPurchasedStatus(
    id,
    'accessory'
  )
  const interiorItemsWithPurchased = await getItemsWithPurchasedStatus(
    id,
    'interior'
  )

  return c.json(
    {
      accessories: accessoriesWithPurchased,
      interior_items: interiorItemsWithPurchased,
    },

    HttpStatusCodes.OK
  )
}

export const purchase: AppRouteHandler<PurchaseRoute> = async (c) => {
  const { id } = c.req.valid('param')

  const { userId, itemType } = c.req.valid('json')

  const dbUser = await db.query.user.findFirst({
    where(fields, operators) {
      return operators.eq(fields.id, userId)
    },
  })

  if (itemType === 'accessory') {
    const accessory = await db.query.accessories.findFirst({
      where(fields, operators) {
        return operators.eq(fields.id, id)
      },
    })
    if (accessory && dbUser && dbUser.gems >= accessory.price) {
      await db
        .insert(purchasedAccessories)
        .values({ userId: userId, itemId: id, type: accessory.type })
      await db
        .update(user)
        .set({ gems: dbUser.gems - accessory.price })
        .where(eq(user.id, userId))
    } else {
      return c.json(
        {
          message: 'You do not have enough gems to purchase this item',
        },
        HttpStatusCodes.FORBIDDEN
      )
    }
  }

  if (itemType === 'interior') {
    const interiorItem = await db.query.interiorItems.findFirst({
      where(fields, operators) {
        return operators.eq(fields.id, id)
      },
    })
    if (interiorItem && dbUser && dbUser.gems >= interiorItem.price) {
      await db
        .insert(purchasedInteriorItems)
        .values({ userId: userId, itemId: id, type: interiorItem.type })

      await db
        .update(user)
        .set({ gems: dbUser.gems - interiorItem.price })
        .where(eq(user.id, userId))
    } else {
      return c.json(
        {
          message: 'You do not have enough gems to purchase this item',
        },
        HttpStatusCodes.FORBIDDEN
      )
    }
  }

  const [accessoriesWithPurchased, interiorItemsWithPurchased] =
    await Promise.all([
      getItemsWithPurchasedStatus(userId, 'accessory'),
      getItemsWithPurchasedStatus(userId, 'interior'),
    ])

  return c.json(
    {
      accessories: accessoriesWithPurchased,
      interior_items: interiorItemsWithPurchased,
    },

    HttpStatusCodes.OK
  )
}

export const updateAccessory: AppRouteHandler<UpdateAccessoryRoute> = async (
  c
) => {
  const { id } = c.req.valid('param')
  const { userId } = c.req.valid('json')

  const currentActiveAccessory = await db.query.purchasedAccessories.findFirst({
    where(fields, operators) {
      return operators.and(
        operators.eq(fields.userId, userId),
        operators.eq(fields.isActive, true)
      )
    },
  })

  const accessoryToUpdate = await db.query.purchasedAccessories.findFirst({
    where(fields, operators) {
      return operators.and(
        operators.eq(fields.userId, userId),
        operators.eq(fields.itemId, id)
      )
    },
  })

  if (!accessoryToUpdate) {
    return c.json(
      { message: 'Accessory has not been purchased.' },
      HttpStatusCodes.NOT_FOUND
    )
  }

  // Deactivate the currently active accessory if necessary
  if (
    currentActiveAccessory &&
    currentActiveAccessory.id !== accessoryToUpdate.id
  ) {
    await db
      .update(purchasedAccessories)
      .set({ isActive: false })
      .where(eq(purchasedAccessories.id, currentActiveAccessory.id))
  }

  const newActiveState = !accessoryToUpdate.isActive

  await db
    .update(purchasedAccessories)
    .set({ isActive: newActiveState })
    .where(eq(purchasedAccessories.itemId, id))

  const [updatedAccessories, updatedInteriorItems] = await Promise.all([
    getItemsWithPurchasedStatus(userId, 'accessory'),
    getItemsWithPurchasedStatus(userId, 'interior'),
  ])

  return c.json(
    {
      accessories: updatedAccessories,
      interior_items: updatedInteriorItems,
    },
    HttpStatusCodes.OK
  )
}

export const updatedInteriorItems: AppRouteHandler<
  UpdateInteriorItemsRoute
> = async (c) => {
  const { id } = c.req.valid('param')
  const { userId } = c.req.valid('json')

  const interiorItemToUpdate = await db.query.purchasedInteriorItems.findFirst({
    where(fields, operators) {
      return operators.and(
        operators.eq(fields.userId, userId),
        operators.eq(fields.itemId, id)
      )
    },
  })

  if (!interiorItemToUpdate) {
    return c.json(
      { message: 'Interior item has not been purchased.' },
      HttpStatusCodes.NOT_FOUND
    )
  }

  const newActiveState = !interiorItemToUpdate.isActive

  await db
    .update(purchasedInteriorItems)
    .set({ isActive: newActiveState })
    .where(eq(purchasedInteriorItems.itemId, id))

  const [updatedAccessories, updatedInteriorItems] = await Promise.all([
    getItemsWithPurchasedStatus(userId, 'accessory'),
    getItemsWithPurchasedStatus(userId, 'interior'),
  ])

  return c.json(
    {
      accessories: updatedAccessories,
      interior_items: updatedInteriorItems,
    },
    HttpStatusCodes.OK
  )
}
