import * as handlers from './sleep.handlers'
import * as routes from './sleep.routes'
import { createRouter } from '@/lib/create-app'

export const sleepRouter = createRouter()
  .openapi(routes.get, handlers.get)
  .openapi(routes.update, handlers.update)
