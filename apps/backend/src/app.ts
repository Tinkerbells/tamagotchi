import configureOpenAPI from '@/lib/configure-open-api'
import createApp from '@/lib/create-app'
import {
  normsRouter,
  userRouter,
  petRouter,
  resourcesRouter,
  shopRouter,
  sleepRouter,
  waterRouter,
  achievementsRouter,
  vkUserRouter,
  baseRouter,
  mealRouter,
  gratitudeRouter,
  meditationRouter,
  walkingRouter,
} from '@/routes'

const app = createApp()

configureOpenAPI(app)

const _app = app
  .route('/api', baseRouter)
  .route('/api', userRouter)
  .route('/api', petRouter)
  .route('/api', resourcesRouter)
  .route('/api', shopRouter)
  .route('/api', sleepRouter)
  .route('/api', waterRouter)
  .route('/api', normsRouter)
  .route('/api', mealRouter)
  .route('/api', gratitudeRouter)
  .route('/api', meditationRouter)
  .route('/api', achievementsRouter)
  .route('/api', walkingRouter)
  .route('/api/vk', vkUserRouter)
// .route('/telegram', telegramUser)

export type AppType = typeof _app

export default app
