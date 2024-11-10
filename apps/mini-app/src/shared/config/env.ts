import { z } from 'zod'

const envSchema = z.object({
  FLYIMG_URL: z.string().url(),
})

// Parse and validate the environment variables
const parsedEnv = envSchema.safeParse({
  FLYIMG_URL: import.meta.env.VITE_FLYIMG_URL,
})

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:', parsedEnv.error.format())
  throw new Error('Invalid environment variables')
}

export const env = parsedEnv.data

declare global {
  type ProcessEnv = z.infer<typeof envSchema>
}
