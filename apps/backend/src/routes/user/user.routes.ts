import { insertUserSchema, selectUserSchema } from '@/db/schema'
import { notFoundSchema } from '@/lib/constants'
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
    body: jsonContentRequired(insertUserSchema, 'The user to create'),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(insertUserSchema, 'The created task'),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertUserSchema),
      'The validation error(s)'
    ),
  },
})

export const getOne = createRoute({
  path: '/user/{id}',
  method: 'get',
  request: {
    params: IdParamsSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(selectUserSchema, 'The requested user'),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, 'User not found'),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      'Invalid id error'
    ),
  },
})

// export const remove = createRoute({
//   path: '/tasks/{id}',
//   method: 'delete',
//   request: {
//     params: IdParamsSchema,
//   },
//   tags,
//   responses: {
//     [HttpStatusCodes.NO_CONTENT]: {
//       description: 'Task deleted',
//     },
//     [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, 'Task not found'),
//     [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
//       createErrorSchema(IdParamsSchema),
//       'Invalid id error'
//     ),
//   },
// })

export type ListRoute = typeof list
export type CreateRoute = typeof create
export type GetOneRoute = typeof getOne
// export type GetOneRoute = typeof getOne
// export type PatchRoute = typeof patch
// export type RemoveRoute = typeof remove
