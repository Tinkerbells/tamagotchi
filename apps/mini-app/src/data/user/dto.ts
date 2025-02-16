import type { UserInfo } from '@vkontakte/vk-bridge'
import type { user, userMood } from '@tamagotchi/api/hc'

export type User = Omit<typeof user.$inferSelect, 'createdAt' | 'updatedAt'> & {
  createdAt?: string | Date
  updatedAt?: string | Date
}

export interface CreateUserDto {
  vkUser?: UserInfo
  petName: string
}

export interface UpdateUserDto {
  gems: number
}

export type UserMood = Omit<typeof userMood.$inferSelect, 'createdAt'> & {
  createdAt: string
}

export type UserId = number
