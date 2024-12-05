import { insertPetSchema, selectPetSchema } from '@/db/schema'
import { notFoundSchema } from '@/lib/constants'
import { createRoute } from '@hono/zod-openapi'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers'
import { createErrorSchema, IdParamsSchema } from 'stoker/openapi/schemas'

const tags = ['Pet']

export const create = createRoute({
  path: '/pet',
  method: 'post',
  request: {
    body: jsonContentRequired(insertPetSchema, 'The pet to create'),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(selectPetSchema, 'The created pet'),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertPetSchema),
      'The validation error(s)'
    ),
  },
})

export const update = createRoute({
  path: '/pet/{id}',
  method: 'patch',
  request: {
    params: IdParamsSchema,
    body: jsonContentRequired(insertPetSchema, 'The pet update'),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(selectPetSchema, 'The updated pet'),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, 'Pet not found'),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertPetSchema),
      'The validation error(s)'
    ),
  },
})

export const get = createRoute({
  path: '/pet/{id}',
  method: 'get',
  request: {
    params: IdParamsSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(selectPetSchema, 'The requested pet'),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, 'Pet not found'),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      'Invalid id error'
    ),
  },
})

export type CreateRoute = typeof create
export type GetOneRoute = typeof get
export type UpdateRoute = typeof update
