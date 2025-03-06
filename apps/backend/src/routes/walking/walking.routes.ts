import { insertWalkingSchema, selectWalkingSchema } from '@/db/schema'
import { forbiddenSchema } from '@/lib/constants'
import { createRoute, z } from '@hono/zod-openapi'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers'
import { createErrorSchema, IdParamsSchema } from 'stoker/openapi/schemas'

const tags = ['walking']

export const create = createRoute({
  path: '/walking',
  method: 'post',
  request: {
    body: jsonContentRequired(insertWalkingSchema, 'The walking create'),
  },
  tags,
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(
      selectWalkingSchema,
      'The created walking'
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertWalkingSchema),
      'The validation error(s)'
    ),
  },
})

export const get = createRoute({
  path: '/walkings/{id}',
  method: 'get',
  request: {
    params: IdParamsSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectWalkingSchema),
      'The requested walkings'
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      forbiddenSchema,
      'walkings not found'
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      'Invalid id error'
    ),
  },
})

export type GetRoute = typeof get
export type CreateRoute = typeof create
