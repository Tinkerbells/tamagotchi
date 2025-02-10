import { insertMealSchema, selectMealSchema } from '@/db/schema'
import { forbiddenSchema } from '@/lib/constants'
import { createRoute, z } from '@hono/zod-openapi'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers'
import { createErrorSchema, IdParamsSchema } from 'stoker/openapi/schemas'

const tags = ['Meal']

export const update = createRoute({
  path: '/meal/{id}',
  method: 'patch',
  request: {
    params: IdParamsSchema,
    body: jsonContentRequired(insertMealSchema, 'The meals update'),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(selectMealSchema, 'The updated meals'),
    [HttpStatusCodes.CREATED]: jsonContent(
      selectMealSchema,
      'The created meal'
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(forbiddenSchema, 'Meal not found'),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertMealSchema),
      'The validation error(s)'
    ),
  },
})

export const get = createRoute({
  path: '/meals/{id}',
  method: 'get',
  request: {
    params: IdParamsSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectMealSchema),
      'The requested meals'
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      forbiddenSchema,
      'Meals not found'
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      'Invalid id error'
    ),
  },
})

export type GetRoute = typeof get
export type UpdateRoute = typeof update
