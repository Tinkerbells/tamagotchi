import * as handlers from './norms.handlers'
import * as routes from './norms.routes'
import { createRouter } from '@/lib/create-app'

export const normsRouter = createRouter()
  .openapi(routes.get, handlers.get)
  .openapi(routes.update, handlers.update)
