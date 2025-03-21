import { createRouter } from '@/lib/create-app'
import { createRoute } from '@hono/zod-openapi'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { jsonContent } from 'stoker/openapi/helpers'
import { createMessageObjectSchema } from 'stoker/openapi/schemas'

export const baseRouter = createRouter().openapi(
  createRoute({
    tags: ['Index'],
    method: 'get',
    path: '/',
    responses: {
      [HttpStatusCodes.OK]: jsonContent(
        createMessageObjectSchema('Tamagotchi API'),
        'Tamagotchi API Index'
      ),
    },
  }),
  (c) => {
    return c.json(
      {
        message: 'Tamagotchi API is working',
      },
      HttpStatusCodes.OK
    )
  }
)
