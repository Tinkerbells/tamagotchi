import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'production']).default('development'),
    BACKEND_PORT: z.string().default('5000'),
  },
  runtimeEnv: process.env,
  // skipValidation: true,
})

export default env
