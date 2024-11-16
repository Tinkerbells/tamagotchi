import env from './lib/env'
import { serve } from '@hono/node-server'
import { Server, tracing } from '@tamagotchi/api'
import { connection } from '@tamagotchi/drizzle'
import { logger } from '@tamagotchi/logger'
import { compress } from 'bun-compression'
import { Hono } from 'hono'
import { hc } from 'hono/client'
import { cors } from 'hono/cors'
import { showRoutes } from 'hono/dev'
import { logger as httpLogger } from 'hono/logger'
import { trimTrailingSlash } from 'hono/trailing-slash'

const app = new Hono()

// Generic middlewares
app.use(cors())
app.use(tracing)
app.use(compress())
app.use(httpLogger())
app.use(trimTrailingSlash())

await connection.ping()
logger.info('Database connection established')

const server = new Server(app)

// export RPC type

server.configure()

const client = hc<typeof app>('')
type Client = typeof client

export const hcWithType = (...args: Parameters<typeof hc>): Client =>
  hc<typeof app>(...args)

const clientB = hcWithType('http://localhost:5000/')

if (env.NODE_ENV === 'development') {
  console.log('Available routes:')
  showRoutes(app)
}

const port = parseInt(env.BACKEND_PORT)
logger.info(`Server is running on port: ${port}, env: ${env.NODE_ENV}`)
const web = serve({ fetch: app.fetch, port })

process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received')

  logger.info('Closing http server')
  web.close(async () => {
    logger.info('Closing worker')
    await server.shutDownWorker()

    logger.info('Closing database connection')
    await connection.end()

    logger.info('Exiting...')
    process.exit(0)
  })
})
