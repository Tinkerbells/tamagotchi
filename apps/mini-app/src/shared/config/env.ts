import { z } from 'zod'

const envSchema = z.object({
  // FLYIMG_URL: z.string().url(),
  NODE_ENV: z.enum(['development', 'production']),
  VITE_BACKEND_URL: z.string().url(),
})

const parsedEnv = envSchema.safeParse({
  NODE_ENV: import.meta.env.MODE,
  VITE_BACKEND_URL: import.meta.env.VITE_BACKEND_URL,
})

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:', parsedEnv.error.format())
  throw new Error('Invalid environment variables')
}

export const env = parsedEnv.data
