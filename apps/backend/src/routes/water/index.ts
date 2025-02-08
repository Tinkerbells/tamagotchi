import * as handlers from './water.handlers'
import * as routes from './water.routes'
import { createRouter } from '@/lib/create-app'

export const waterRouter = createRouter()
  .openapi(routes.get, handlers.get)
  .openapi(routes.update, handlers.update)
