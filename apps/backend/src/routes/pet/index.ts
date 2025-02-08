import * as handlers from './pet.handlers'
import * as routes from './pet.routes'
import { createRouter } from '@/lib/create-app'

export const petRouter = createRouter()
  .openapi(routes.create, handlers.create)
  .openapi(routes.get, handlers.get)
  .openapi(routes.update, handlers.update)
