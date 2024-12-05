import configureOpenAPI from '@/lib/configure-open-api'
import createApp from '@/lib/create-app'
import achievements from '@/routes/achievements/achievements.index'
import index from '@/routes/index.route'
import pet from '@/routes/pet/pet.index'
import resources from '@/routes/resources/resources.index'
import store from '@/routes/store/store.index'
import user from '@/routes/user/user.index'

const app = createApp()

configureOpenAPI(app)

const _app = app
  .route('/', index)
  .route('/', user)
  .route('/', pet)
  .route('/', resources)
  .route('/', store)
  .route('/', achievements)

export type AppType = typeof _app

export default app
