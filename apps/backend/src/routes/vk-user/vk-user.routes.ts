import { insertVkUserSchema, selectVkUserSchema } from '@/db/schema'
import { forbiddenSchema } from '@/lib/constants'
import { createRoute, z } from '@hono/zod-openapi'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers'
import { createErrorSchema, IdParamsSchema } from 'stoker/openapi/schemas'

const tags = ['VK user']

export const list = createRoute({
  path: '/user',
  method: 'get',
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectVkUserSchema),
      'The list of vk users'
    ),
  },
})

export const create = createRoute({
  path: '/user',
  method: 'post',
  request: {
    body: jsonContentRequired(insertVkUserSchema, 'The vk user to create'),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectVkUserSchema,
      'The vk created user'
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertVkUserSchema),
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
    [HttpStatusCodes.OK]: jsonContent(
      selectVkUserSchema,
      'The requested vk user'
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      forbiddenSchema,
      'Vk user not found'
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      'Invalid id error'
    ),
  },
})

export type ListRoute = typeof list
export type CreateRoute = typeof create
export type GetRoute = typeof get
