import { updateNormsSchema, selectNormsSchema } from '@/db/schema'
import { forbiddenSchema } from '@/lib/constants'
import { createRoute } from '@hono/zod-openapi'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers'
import { createErrorSchema, IdParamsSchema } from 'stoker/openapi/schemas'

const tags = ['Norms']

export const update = createRoute({
  path: '/norms/{id}',
  method: 'patch',
  request: {
    params: IdParamsSchema,
    body: jsonContentRequired(updateNormsSchema, 'The norms update'),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(selectNormsSchema, 'The updated norms'),
    [HttpStatusCodes.CREATED]: jsonContent(
      selectNormsSchema,
      'The updated norms'
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      forbiddenSchema,
      'Norms not found'
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(updateNormsSchema),
      'The validation error(s)'
    ),
  },
})

export const get = createRoute({
  path: '/norms/{id}',
  method: 'get',
  request: {
    params: IdParamsSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(selectNormsSchema, 'The requested norms'),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      forbiddenSchema,
      'Norms not found'
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      'Invalid id error'
    ),
  },
})

export type GetRoute = typeof get
export type UpdateRoute = typeof update
