import configureOpenAPI from '@/lib/configure-open-api'
import createApp from '@/lib/create-app'
import index from '@/routes/index.route'
import user from '@/routes/user/user.index'

const app = createApp()

configureOpenAPI(app)

const _app = app.route('/', index).route('/', user)

export type AppType = typeof _app

export default app
