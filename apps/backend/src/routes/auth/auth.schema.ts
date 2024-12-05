import { z } from 'zod'

export const authSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
})

const vkAuthParamsSchema = z.object({
  vk_user_id: z.number(),
  vk_app_id: z.number(),
  vk_is_app_user: z.union([z.literal(0), z.literal(1)]),
  vk_are_notifications_enabled: z.union([z.literal(0), z.literal(1)]),
  vk_language: z.string(),
  vk_ref: z.string(),
  vk_access_token_settings: z.string(),
  vk_group_id: z.number().optional(),
  vk_viewer_group_role: z.string().optional(),
  vk_platform: z.string(),
  vk_is_favorite: z.union([z.literal(0), z.literal(1)]),
  vk_ts: z.number(),
  sign: z.string(),
})

export type VkAuthParams = z.infer<typeof vkAuthParamsSchema>

export const vkAuthSchema = z.object({
  sign: vkAuthParamsSchema,
})
