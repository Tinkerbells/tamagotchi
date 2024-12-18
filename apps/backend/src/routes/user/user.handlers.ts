import type {
  CreateRoute,
  ListRoute,
  GetOneRoute,
  GetUserMood,
  CreateUserMood,
} from './user.routes'
import { db } from '@/db'
import { norms, pet, user, userMood, vkUser } from '@/db/schema'
import type { AppRouteHandler } from '@/lib/types'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import * as HttpStatusPhrases from 'stoker/http-status-phrases'

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const users = await db.query.user.findMany()
  return c.json(users)
}

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const { user: newUser, vkUser: newVkUser, petName } = c.req.valid('json')
  if (newVkUser) {
    const [insertedVkUser] = await db
      .insert(vkUser)
      .values(newVkUser)
      .returning()
  } else {
    return c.json(
      {
        message: 'VK or Telegram user not provided',
      },
      HttpStatusCodes.BAD_REQUEST
    )
  }
  const [insertedUser] = await db.insert(user).values(newUser).returning()
  await db.insert(norms).values({ userId: insertedUser.id })
  await db.insert(pet).values({ name: petName, userId: insertedUser.id })

  return c.json(insertedUser, HttpStatusCodes.OK)
}

export const get: AppRouteHandler<GetOneRoute> = async (c) => {
  const { id } = c.req.valid('param')
  const userByVkId = await db.query.user.findFirst({
    where(fields, operators) {
      return operators.eq(fields.vkId, id)
    },
  })

  if (!userByVkId) {
    return c.json(
      {
        message: HttpStatusPhrases.NOT_FOUND,
      },
      HttpStatusCodes.NOT_FOUND
    )
  }

  return c.json(userByVkId, HttpStatusCodes.OK)
}

export const getUserMood: AppRouteHandler<GetUserMood> = async (c) => {
  const { id } = c.req.valid('param')

  const now = new Date()
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  )
  const endOfToday = new Date(startOfToday)
  endOfToday.setDate(startOfToday.getDate() + 1)

  const userMood = await db.query.userMood.findFirst({
    where(fields, operators) {
      return operators.and(
        operators.eq(fields.userId, id),
        operators.gte(fields.createdAt, startOfToday),
        operators.lt(fields.createdAt, endOfToday)
      )
    },
  })

  if (!userMood) {
    return c.json(
      {
        message: HttpStatusPhrases.NOT_FOUND,
      },
      HttpStatusCodes.NOT_FOUND
    )
  }

  return c.json(userMood, HttpStatusCodes.OK)
}

export const createUserMood: AppRouteHandler<CreateUserMood> = async (c) => {
  const { id } = c.req.valid('param')
  const { moodStatus } = c.req.valid('json')
  const [insertedUserMood] = await db
    .insert(userMood)
    .values({ userId: id, moodStatus: moodStatus })
    .returning()

  return c.json(insertedUserMood, HttpStatusCodes.OK)
}
