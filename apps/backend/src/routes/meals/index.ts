import * as handlers from './meals.handlers'
import * as routes from './meals.routes'
import { createRouter } from '@/lib/create-app'

export const mealRouter = createRouter()
  .openapi(routes.get, handlers.get)
  .openapi(routes.update, handlers.update)
