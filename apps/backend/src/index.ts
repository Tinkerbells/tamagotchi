import app from './app'
import env from './env'
import { logger } from './lib/logger'
import { serve } from '@hono/node-server'

const port = env.PORT

logger.info(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port,
})
