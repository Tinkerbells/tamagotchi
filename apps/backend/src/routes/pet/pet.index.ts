import * as handlers from './pet.handlers'
import * as routes from './pet.routes'
import { createRouter } from '@/lib/create-app'

const router = createRouter()
  .openapi(routes.create, handlers.create)
  .openapi(routes.get, handlers.getOne)
  .openapi(routes.update, handlers.update)

export default router
