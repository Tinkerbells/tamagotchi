import * as handlers from './shop.handlers'
import * as routes from './shop.routes'
import { createRouter } from '@/lib/create-app'

export const shopRouter = createRouter()
  .openapi(routes.get, handlers.get)
  .openapi(routes.purchase, handlers.purchase)
  .openapi(routes.updateAccessory, handlers.updateAccessory)
  .openapi(routes.updateInteriorItems, handlers.updatedInteriorItems)
