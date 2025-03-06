import * as handlers from './walking.handlers'
import * as routes from './walking.routes'
import { createRouter } from '@/lib/create-app'

export const walkingRouter = createRouter()
  .openapi(routes.get, handlers.get)
  .openapi(routes.create, handlers.create)
