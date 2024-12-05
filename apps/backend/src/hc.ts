import { AppType } from './app'
import { hc } from 'hono/client'

export * from '@/db/schema'

const client = hc<AppType>('')
export type Client = typeof client

export const hcWithType = (...args: Parameters<typeof hc>): Client =>
  hc<AppType>(...args)
