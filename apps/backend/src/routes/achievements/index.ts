import * as handlers from './achievements.handlers'
import * as routes from './achievements.routes'
import { createRouter } from '@/lib/create-app'

export const achievementsRouter = createRouter()
  .openapi(routes.update, handlers.update)
  .openapi(routes.get, handlers.get)
