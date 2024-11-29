import { createRouter } from '@/lib/create-app'
import { auth } from '@/middlewares'
import { createRoute } from '@hono/zod-openapi'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { jsonContent } from 'stoker/openapi/helpers'
import { createMessageObjectSchema } from 'stoker/openapi/schemas'

const router = createRouter().openapi(
  createRoute({
    tags: ['Index'],
    method: 'get',
    middleware: auth,
    path: '/',
    responses: {
      [HttpStatusCodes.OK]: jsonContent(
        createMessageObjectSchema('User API'),
        'User API Index'
      ),
    },
  }),
  (c) => {
    return c.json(
      {
        message: 'User API',
      },
      HttpStatusCodes.OK
    )
  }
)

export default router
