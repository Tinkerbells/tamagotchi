import { createEnv } from '@t3-oss/env-core'
import 'dotenv/config'
import { z } from 'zod'

export const env = createEnv({
  server: {
    DB_HOST: z.string().default('localhost'),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
    DB_NAME: z.string(),
  },
  runtimeEnv: process.env,
  skipValidation: true,
})
