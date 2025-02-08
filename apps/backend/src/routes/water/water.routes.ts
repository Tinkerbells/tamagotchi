import { selectWaterSchema, insertWaterSchema } from '@/db/schema'
import { forbiddenSchema } from '@/lib/constants'
import { createRoute, z } from '@hono/zod-openapi'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers'
import { createErrorSchema, IdParamsSchema } from 'stoker/openapi/schemas'

const tags = ['Water']

export const update = createRoute({
  path: '/water/{id}',
  method: 'patch',
  request: {
    params: IdParamsSchema,
    body: jsonContentRequired(insertWaterSchema, 'The water update'),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(selectWaterSchema, 'The updated water'),
    [HttpStatusCodes.CREATED]: jsonContent(
      selectWaterSchema,
      'The created water'
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      forbiddenSchema,
      'Water not found'
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertWaterSchema),
      'The validation error(s)'
    ),
  },
})

export const get = createRoute({
  path: '/water/{id}',
  method: 'get',
  request: {
    params: IdParamsSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectWaterSchema),
      'The requested water'
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      forbiddenSchema,
      'Water not found'
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      'Invalid id error'
    ),
  },
})

export type GetRoute = typeof get
export type UpdateRoute = typeof update
