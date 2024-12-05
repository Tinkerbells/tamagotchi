import * as handlers from './resources.handlers'
import * as routes from './resources.routes'
import { createRouter } from '@/lib/create-app'

const router = createRouter()
  .openapi(routes.get, handlers.get)
  .openapi(routes.create, handlers.create)
  .openapi(routes.update, handlers.update)

export default router
