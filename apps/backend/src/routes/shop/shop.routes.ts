import { selectAccessoriesSchema, selectInteriorItemsSchema } from '@/db/schema'
import { forbiddenSchema, notFoundSchema } from '@/lib/constants'
import { createRoute, z } from '@hono/zod-openapi'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers'
import { createErrorSchema, IdParamsSchema } from 'stoker/openapi/schemas'

const tags = ['Shop']

export const getShopSchema = z.object({
  accessories: z.array(
    selectAccessoriesSchema.extend({
      isPurchased: z.boolean(),
      isActive: z.boolean().optional(),
    })
  ),
  interior_items: z.array(
    selectInteriorItemsSchema.extend({
      isPurchased: z.boolean(),
      isActive: z.boolean().optional(),
    })
  ),
})

export const shopPurchaseSchema = z.object({
  userId: z.number(),
  itemType: z.enum(['accessory', 'interior']),
})

export const get = createRoute({
  path: '/shop/{id}',
  method: 'get',
  request: {
    params: IdParamsSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(getShopSchema, 'The shop'),
  },
})

export const purchase = createRoute({
  path: '/shop/purchase/{id}',
  method: 'patch',
  request: {
    params: IdParamsSchema,
    body: jsonContentRequired(shopPurchaseSchema, 'The item to purchase'),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(getShopSchema, 'The updated shop'),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, 'Shop not found'),
    [HttpStatusCodes.FORBIDDEN]: jsonContent(
      forbiddenSchema,
      'Item price to big'
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(shopPurchaseSchema),
      'The validation error(s)'
    ),
  },
})

export const updateAccessory = createRoute({
  path: '/shop/accessory/{id}',
  method: 'patch',
  request: {
    params: IdParamsSchema,
    body: jsonContentRequired(
      shopPurchaseSchema.omit({ itemType: true }),
      'The item to activate'
    ),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(getShopSchema, 'The updated shop'),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, 'Shop not found'),
    [HttpStatusCodes.FORBIDDEN]: jsonContent(
      forbiddenSchema,
      'Item is not purchased'
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(shopPurchaseSchema.omit({ itemType: true })),
      'The validation error(s)'
    ),
  },
})

export const updateInteriorItems = createRoute({
  path: '/shop/interior/{id}',
  method: 'patch',
  request: {
    params: IdParamsSchema,
    body: jsonContentRequired(
      shopPurchaseSchema.omit({ itemType: true }),
      'The item to activate'
    ),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(getShopSchema, 'The updated shop'),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, 'Shop not found'),
    [HttpStatusCodes.FORBIDDEN]: jsonContent(
      forbiddenSchema,
      'Item is not purchased'
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(shopPurchaseSchema.omit({ itemType: true })),
      'The validation error(s)'
    ),
  },
})

export type GetRoute = typeof get
export type PurchaseRoute = typeof purchase
export type UpdateAccessoryRoute = typeof updateAccessory
export type UpdateInteriorItemsRoute = typeof updateInteriorItems
