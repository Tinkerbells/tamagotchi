import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  server: {
    LOG_LEVEL: z.string().default('info'),
  },
  runtimeEnv: process.env,
})
