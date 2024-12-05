import * as handlers from './achievements.handlers'
import * as routes from './achievements.routes'
import { createRouter } from '@/lib/create-app'

const router = createRouter()
  .openapi(routes.update, handlers.update)
  .openapi(routes.get, handlers.get)

export default router
