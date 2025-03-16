import {
  selectAchievementsSchema,
  insertUserAchievementsSchema,
} from '@/db/schema'
import { forbiddenSchema } from '@/lib/constants'
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
      forbiddenSchema,
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
      forbiddenSchema,
      'Achievements not found'
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      'Invalid id error'
    ),
  },
})

// Define the response schema for checking achievements
const checkAchievementsResponseSchema = z.object({
  achievements: z.array(
    selectAchievementsSchema.extend({ 
      isUnlocked: z.boolean(),
    })
  ),
  newlyEarned: z.array(selectAchievementsSchema).optional()
})

// Route for checking and potentially awarding achievements
export const checkAchievements = createRoute({
  path: '/achievements/check/{id}',
  method: 'post',
  request: {
    params: IdParamsSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      checkAchievementsResponseSchema,
      'User achievements status with any newly earned achievements'
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      forbiddenSchema,
      'User not found'
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      'Invalid id error'
    ),
  },
})

export type CheckAchievementsRoute = typeof checkAchievements
export type UpdateRoute = typeof update
export type GetRoute = typeof get
