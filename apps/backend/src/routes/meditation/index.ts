import * as handlers from './meditation.handlers'
import * as routes from './meditation.routes'
import { createRouter } from '@/lib/create-app'

export const meditationRouter = createRouter()
  .openapi(routes.get, handlers.get)
  .openapi(routes.create, handlers.create)
