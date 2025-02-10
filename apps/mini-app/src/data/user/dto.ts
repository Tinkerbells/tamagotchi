import { user, userMood } from '@tamagotchi/api/hc'
import { UserInfo } from '@vkontakte/vk-bridge'

export type User = Omit<typeof user.$inferSelect, 'createdAt' | 'updatedAt'> & {
  createdAt?: string | Date
  updatedAt?: string | Date
}

export type CreateUserDto = {
  vkUser?: UserInfo
  petName: string
}

export type UpdateUserDto = {
  gems: number
}


export type UserMood = Omit<typeof userMood.$inferSelect, 'createdAt'> & {
  createdAt: string
}

export type UserId = number
