import * as handlers from './user.handlers'
import * as routes from './user.routes'
import { createRouter } from '@/lib/create-app'

export const userRouter = createRouter()
  .openapi(routes.list, handlers.list)
  .openapi(routes.create, handlers.create)
  .openapi(routes.get, handlers.get)
  .openapi(routes.update, handlers.update)
  .openapi(routes.getUserMood, handlers.getUserMood)
  .openapi(routes.createUserMood, handlers.createUserMood)
