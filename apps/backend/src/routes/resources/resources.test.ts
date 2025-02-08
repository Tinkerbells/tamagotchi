import { resourcesRouter } from '.'
import env from '@/env'
import createApp from '@/lib/create-app'
import { testClient } from 'hono/testing'
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import { resolve } from 'node:path'
import { afterAll, beforeAll, describe, expect, expectTypeOf, it } from 'vitest'

if (env.NODE_ENV !== 'test') {
  throw new Error("NODE_ENV must be 'test'")
}

const client = testClient(createApp().route('/', resourcesRouter))

describe('tasks routes', () => {
  beforeAll(async () => {
    execSync('pnpm drizzle-kit push')
  })

  afterAll(async () => {
    fs.rmSync('test.db', { force: true })
  })
})
