import * as schema from './schema'
import { user } from './schema'
import env from '@/env'
import { logger } from '@/lib/logger'
import { Logger as drizzleLogger } from 'drizzle-orm/logger'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

const DB_ERRORS = {
  DUPLICATE_KEY: 'ER_DUP_ENTRY',
}

export interface DatabaseError {
  type: string
  message: string
  stack?: string
  code: string
  errno: number
  sql: string
  sqlState: string
  sqlMessage: string
}

export type User = typeof user.$inferSelect
export type NewUser = typeof user.$inferInsert

class DBLogger implements drizzleLogger {
  logQuery(query: string, params: unknown[]): void {
    logger.debug({ query, params })
  }
}

const connection = postgres(env.DATABASE_URL)

const db = drizzle(connection, {
  schema: schema,
  logger: new DBLogger(),
})

export { DB_ERRORS, connection, db }
