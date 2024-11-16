import { createEnv } from '@t3-oss/env-core'
import 'dotenv/config'
import { z } from 'zod'

const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'production']).default('development'),
    SECRET_KEY: z.string(),
    REDIS_HOST: z.string().default('localhost'),
    REDIS_PORT: z.string().default('6379'),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    SECRET_KEY: process.env.SECRET_KEY,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
  },
  // skipValidation: true,
})

export default env
