import { logger } from '@/lib/logger'
import { pinoLogger as pino } from 'hono-pino'

export function pinoLogger() {
  return pino({
    pino: logger,
    // http: {
    //   reqId: () => crypto.randomUUID(),
    // },
  })
}
