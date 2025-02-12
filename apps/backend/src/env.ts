/* eslint-disable node/no-process-env */
import { createEnv } from '@t3-oss/env-core'
import 'dotenv/config'
import { z } from 'zod'

const env = createEnv({
  server: {
    APP_URL: z.string().url(),
    NODE_ENV: z
      .enum(['development', 'production', 'test'])
      .default('development'),
    DATABASE_URL: z.string().url(),
    PORT: z.coerce.number().default(5000),
    SECRET_KEY: z.string(),
    LOG_LEVEL: z.enum([
      'fatal',
      'error',
      'warn',
      'info',
      'debug',
      'trace',
      'silent',
    ]),
  },
  runtimeEnv: process.env,
  skipValidation: false,
})

export default env
