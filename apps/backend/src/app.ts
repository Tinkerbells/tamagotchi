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
  meditationRouter
} from '@/routes'

const app = createApp()

configureOpenAPI(app)

const _app = app
  .route('/', baseRouter)
  .route('/', userRouter)
  .route('/', petRouter)
  .route('/', resourcesRouter)
  .route('/', shopRouter)
  .route('/', sleepRouter)
  .route('/', waterRouter)
  .route('/', normsRouter)
  .route('/', mealRouter)
  .route('/', gratitudeRouter)
  .route('/', meditationRouter)
  .route('/', achievementsRouter)
  .route('/vk', vkUserRouter)
// .route('/telegram', telegramUser)

export type AppType = typeof _app

export default app
