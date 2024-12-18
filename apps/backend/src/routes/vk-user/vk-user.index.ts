import * as handlers from './vk-user.handlers'
import * as routes from './vk-user.routes'
import { createRouter } from '@/lib/create-app'

const router = createRouter()
  .openapi(routes.list, handlers.list)
  .openapi(routes.create, handlers.create)
  .openapi(routes.get, handlers.get)

export default router
