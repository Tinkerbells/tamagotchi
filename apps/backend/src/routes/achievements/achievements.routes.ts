import {
  selectAchievementsSchema,
  insertUserAchievementsSchema,
} from '@/db/schema'
import { notFoundSchema } from '@/lib/constants'
import { createRoute } from '@hono/zod-openapi'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers'
import { createErrorSchema, IdParamsSchema } from 'stoker/openapi/schemas'
import { z } from 'zod'

const tags = ['achievements']

const getAchievementsSchema = z.array(
  selectAchievementsSchema.extend({ isUnlocked: z.boolean() })
)

export const update = createRoute({
  path: '/achievements/{id}',
  method: 'patch',
  request: {
    params: IdParamsSchema,
    body: jsonContentRequired(
      insertUserAchievementsSchema,
      'The user achievements update'
    ),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      insertUserAchievementsSchema,
      'The updated user achievements'
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      'User achievements not found'
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertUserAchievementsSchema),
      'The validation error(s)'
    ),
  },
})

export const get = createRoute({
  path: '/achievements/{id}',
  method: 'get',
  request: {
    params: IdParamsSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      getAchievementsSchema,
      'The requested achievements'
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      'Achievements not found'
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      'Invalid id error'
    ),
  },
})

export type UpdateRoute = typeof update
export type GetRoute = typeof get
