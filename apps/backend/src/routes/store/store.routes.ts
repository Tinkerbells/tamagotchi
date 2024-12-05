import {
  insertPetAccessoriesSchema,
  insertPetInteriorItemsSchema,
  selectAccessoriesSchema,
  selectInteriorItemsSchema,
} from '@/db/schema'
import { notFoundSchema } from '@/lib/constants'
import { createRoute, z } from '@hono/zod-openapi'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers'
import { createErrorSchema, IdParamsSchema } from 'stoker/openapi/schemas'

const tags = ['Store']

const getStoreSchema = z.object({
  accessories: z.array(
    selectAccessoriesSchema.extend({ isPurchased: z.boolean() })
  ),
  interior_items: z.array(
    selectInteriorItemsSchema.extend({
      isPurchased: z.boolean(),
    })
  ),
})

const updateStoreSchema = z.object({
  accessories: insertPetAccessoriesSchema,
  interior_items: insertPetInteriorItemsSchema,
})

export const get = createRoute({
  path: '/store/{id}',
  method: 'get',
  request: {
    params: IdParamsSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(getStoreSchema, 'The store'),
  },
})

export const update = createRoute({
  path: '/store/{id}',
  method: 'patch',
  request: {
    params: IdParamsSchema,
    body: jsonContentRequired(updateStoreSchema, 'The store update'),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(updateStoreSchema, 'The updated store'),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, 'Store not found'),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(updateStoreSchema),
      'The validation error(s)'
    ),
  },
})

export type GetRoute = typeof get
export type UpdateRoute = typeof update
