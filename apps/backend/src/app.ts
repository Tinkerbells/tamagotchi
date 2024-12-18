import configureOpenAPI from '@/lib/configure-open-api'
import createApp from '@/lib/create-app'
import achievements from '@/routes/achievements/achievements.index'
import index from '@/routes/index.route'
import pet from '@/routes/pet/pet.index'
import resources from '@/routes/resources/resources.index'
import shop from '@/routes/shop/shop.index'
import user from '@/routes/user/user.index'
import vkUser from '@/routes/vk-user/vk-user.index'

const app = createApp()

configureOpenAPI(app)

const _app = app
  .route('/', index)
  .route('/', user)
  .route('/', pet)
  .route('/', resources)
  .route('/', shop)
  .route('/', achievements)
  .route('/vk', vkUser)
// .route('/telegram', telegramUser)

export type AppType = typeof _app

export default app
