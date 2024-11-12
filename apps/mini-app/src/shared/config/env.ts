import { z } from 'zod'

const envSchema = z.object({
  // FLYIMG_URL: z.string().url(),
  NODE_ENV: z.enum(['development', 'production']),
})

// Parse and validate the environment variables
const parsedEnv = envSchema.safeParse({
  NODE_ENV: import.meta.env.MODE,
  // FLYIMG_URL: import.meta.env.VITE_FLYIMG_URL,
})

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:', parsedEnv.error.format())
  throw new Error('Invalid environment variables')
}

export const env = parsedEnv.data

declare global {
  type ProcessEnv = z.infer<typeof envSchema>
}
