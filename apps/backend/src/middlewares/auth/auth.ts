import { validateAuthParams } from './utils'
import { createMiddleware } from 'hono/factory'

export const auth = createMiddleware(async (c, next) => {
  const HOUR = 3600
  const authorization = c.req.header('Authorization')

  if (!authorization) {
    return c.text('Unauthorized', { status: 401 })
  }

  const validate = validateAuthParams(authorization)
  if (validate) {
    await next()
  } else {
    return c.text('Unauthorized', { status: 401 })
  }
})
