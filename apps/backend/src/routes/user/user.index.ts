import * as handlers from './user.handlers'
import * as routes from './user.routes'
import { createRouter } from '@/lib/create-app'

const router = createRouter()
  .openapi(routes.list, handlers.list)
  .openapi(routes.create, handlers.create)
  .openapi(routes.get, handlers.get)
  .openapi(routes.getUserMood, handlers.getUserMood)
  .openapi(routes.createUserMood, handlers.createUserMood)

export default router
