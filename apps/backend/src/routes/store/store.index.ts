import * as handlers from './store.handlers'
import * as routes from './store.routes'
import { createRouter } from '@/lib/create-app'

const router = createRouter().openapi(routes.get, handlers.get)

export default router
