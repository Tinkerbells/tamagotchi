import {
  insertUserMoodSchema,
  insertUserSchema,
  insertVkUserSchema,
  selectUserMoodSchema,
  selectUserSchema,
} from '@/db/schema'
import { forbiddenSchema } from '@/lib/constants'
import { createRoute, z } from '@hono/zod-openapi'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers'
import { createErrorSchema, IdParamsSchema } from 'stoker/openapi/schemas'

const tags = ['User']

export const list = createRoute({
  path: '/user',
  method: 'get',
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectUserSchema),
      'The list of users'
    ),
  },
})

export const create = createRoute({
  path: '/user',
  method: 'post',
  request: {
    body: jsonContentRequired(
      z.object({
        user: insertUserSchema,
        vkUser: insertVkUserSchema.optional(),
        // telegramUser: insertTelegramUserSchema.optional(),
        petName: z.string().max(50),
      }),
      'The user to create'
    ),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(selectUserSchema, 'The created task'),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      forbiddenSchema,
      'Bad request! Vk or telegram user not provided'
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertUserSchema),
      'The validation error(s)'
    ),
  },
})

export const get = createRoute({
  path: '/user/{id}',
  method: 'get',
  request: {
    params: IdParamsSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(selectUserSchema, 'The requested user'),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(forbiddenSchema, 'User not found'),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      'Invalid id error'
    ),
  },
})

export const getUserMood = createRoute({
  path: '/user/mood/{id}',
  method: 'get',
  request: {
    params: IdParamsSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(selectUserMoodSchema, 'The mood status'),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      forbiddenSchema,
      'Mood status not found'
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      'Invalid id error'
    ),
  },
})

export const createUserMood = createRoute({
  path: '/user/mood/{id}',
  method: 'post',
  request: {
    params: IdParamsSchema,
    body: jsonContentRequired(insertUserMoodSchema, 'The user mood to create'),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectUserMoodSchema,
      'The created mood status'
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertUserMoodSchema),
      'The validation error(s)'
    ),
  },
})

export type ListRoute = typeof list
export type CreateRoute = typeof create
export type GetOneRoute = typeof get
export type GetUserMood = typeof getUserMood
export type CreateUserMood = typeof createUserMood
