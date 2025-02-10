import * as handlers from './gratitudes.handlers'
import * as routes from './gratitudes.routes'
import { createRouter } from '@/lib/create-app'

export const gratitudeRouter = createRouter()
  .openapi(routes.get, handlers.get)
  .openapi(routes.create, handlers.create)
  .openapi(routes.remove, handlers.remove)
