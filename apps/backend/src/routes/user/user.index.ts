import * as handlers from './user.handlers'
import * as routes from './user.routes'
import { createRouter } from '@/lib/create-app'

const router = createRouter()
  .openapi(routes.list, handlers.list)
  .openapi(routes.create, handlers.create)
  .openapi(routes.getOne, handlers.getOne)

export default router
