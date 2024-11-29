import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'
import { env } from 'env.mjs'

export default defineConfig({
  schema: './src/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
})
