import { insertMeditationSchema, selectMeditationSchema } from '@/db/schema'
import { forbiddenSchema } from '@/lib/constants'
import { createRoute, z } from '@hono/zod-openapi'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers'
import { createErrorSchema, IdParamsSchema } from 'stoker/openapi/schemas'

const tags = ['Meditation']

export const getMeditationParams = z.object({
  for_week: z.boolean().default(true).optional(),
})


export const create = createRoute({
  path: '/meditation',
  method: 'post',
  request: {
    body: jsonContentRequired(insertMeditationSchema, 'The meditation create'),
  },
  tags,
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(
      selectMeditationSchema,
      'The created meditation'
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertMeditationSchema),
      'The validation error(s)'
    ),
  },
})

export const get = createRoute({
  path: '/meditations/{id}',
  method: 'get',
  request: {
    params: IdParamsSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectMeditationSchema),
      'The requested meditations'
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      forbiddenSchema,
      'Meditations not found'
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      'Invalid id error'
    ),
  },
})

export type GetRoute = typeof get
export type CreateRoute = typeof create
