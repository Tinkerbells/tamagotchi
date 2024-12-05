import { authSchema, vkAuthSchema } from './auth.schema'
import { UnauthorizedSchema } from '@/lib/constants'
import { createRoute, z } from '@hono/zod-openapi'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers'

const tags = ['Auth']

export const vkAuth = createRoute({
  path: '/vk',
  method: 'post',
  request: {
    body: jsonContentRequired(vkAuthSchema, 'The vk JWT authorization'),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(authSchema, 'JWT auth tokens'),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      UnauthorizedSchema,
      'Unauthorized'
    ),
  },
})

export const telegramAuth = createRoute({
  path: '/telegram',
  method: 'post',
  request: {
    body: jsonContentRequired(
      z.object({ token: z.string() }),
      'The telegram JWT authorization'
    ),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(authSchema, 'JWT auth tokens'),
  },
})

export type VkAuthRoute = typeof vkAuth
export type TelegramAuthRoute = typeof telegramAuth
