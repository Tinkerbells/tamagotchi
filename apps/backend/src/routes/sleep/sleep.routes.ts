import { selectSleepSchema, insertSleepSchema } from '@/db/schema'
import { forbiddenSchema } from '@/lib/constants'
import { createRoute, z } from '@hono/zod-openapi'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers'
import { createErrorSchema, IdParamsSchema } from 'stoker/openapi/schemas'

const tags = ['Sleep']

export const update = createRoute({
  path: '/sleep/{id}',
  method: 'patch',
  request: {
    params: IdParamsSchema,
    body: jsonContentRequired(insertSleepSchema, 'The sleep update'),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(selectSleepSchema, 'The updated sleep'),
    [HttpStatusCodes.CREATED]: jsonContent(
      selectSleepSchema,
      'The created sleep'
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      forbiddenSchema,
      'Sleep not found'
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertSleepSchema),
      'The validation error(s)'
    ),
  },
})

export const get = createRoute({
  path: '/sleep/{id}',
  method: 'get',
  request: {
    params: IdParamsSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectSleepSchema),
      'The requested sleep'
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      forbiddenSchema,
      'Sleep not found'
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      'Invalid id error'
    ),
  },
})

export type GetRoute = typeof get
export type UpdateRoute = typeof update
