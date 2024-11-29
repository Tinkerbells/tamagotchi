export type LaunchParamsDto = {
  vk_user_id: number
  vk_app_id: number
  vk_is_app_user: 0 | 1
  vk_are_notifications_enabled: 0 | 1
  vk_language: string
  vk_ref: string
  vk_access_token_settings: string
  vk_group_id?: number
  vk_viewer_group_role?: string
  vk_platform: string
  vk_is_favorite: 0 | 1
  vk_ts: number
  sign: string
}
