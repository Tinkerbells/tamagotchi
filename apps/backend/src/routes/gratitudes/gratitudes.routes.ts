import { insertGratitudeSchema, selectGratitudeSchema } from '@/db/schema'
import { forbiddenSchema } from '@/lib/constants'
import { createRoute, z } from '@hono/zod-openapi'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers'
import { createErrorSchema, IdParamsSchema } from 'stoker/openapi/schemas'

const tags = ['Gratitude']

export const getGratitudeParams = z.object({
  forWeek: z.boolean().default(true).optional(),
})

export const remove = createRoute({
  path: '/gratitude/{id}',
  method: 'post',
  request: {
    params: IdParamsSchema,
    body: jsonContentRequired(insertGratitudeSchema, 'The gratitudes update'),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectGratitudeSchema,
      'The deleted gratitude'
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      forbiddenSchema,
      'Gratitude not found'
    ),
  },
})

export const create = createRoute({
  path: '/gratitude',
  method: 'post',
  request: {
    body: jsonContentRequired(insertGratitudeSchema, 'The gratitude create'),
  },
  tags,
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(
      selectGratitudeSchema,
      'The created gratitude'
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertGratitudeSchema),
      'The validation error(s)'
    ),
  },
})

export const get = createRoute({
  path: '/gratitudes/{id}',
  method: 'get',
  request: {
    params: IdParamsSchema,
    body: jsonContentRequired(
      getGratitudeParams,
      'The gratitudes fetch variants'
    ),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectGratitudeSchema),
      'The requested gratitudes'
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      forbiddenSchema,
      'Gratitudes not found'
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      'Invalid id error'
    ),
  },
})

export type GetRoute = typeof get
export type CreateRoute = typeof create
export type RemoveRoute = typeof remove
