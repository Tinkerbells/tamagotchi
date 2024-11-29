import type { AppBindings, AppOpenAPI } from './types'
import env from '@/env'
import { pinoLogger, auth } from '@/middlewares'
import { OpenAPIHono } from '@hono/zod-openapi'
import { compress } from 'hono/compress'
import { cors } from 'hono/cors'
import { logger as httpLogger } from 'hono/logger'
import { trimTrailingSlash } from 'hono/trailing-slash'
import { notFound, onError, serveEmojiFavicon } from 'stoker/middlewares'
import { defaultHook } from 'stoker/openapi'

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook,
  })
}

export default function createApp() {
  const app = createRouter()
  app.use(serveEmojiFavicon('📝'))
  app.use(pinoLogger())
  // app.use(httpLogger())
  app.use(cors({ origin: [env.APP_URL] }))
  app.use(compress())
  app.use(trimTrailingSlash())

  // Auth middleware
  app.use('*', auth)

  app.notFound(notFound)
  app.onError(onError)
  return app
}

export function createTestApp<R extends AppOpenAPI>(router: R) {
  return createApp().route('/', router)
}
