import type { CreateRoute, ListRoute, GetRoute } from './vk-user.routes'
import { db } from '@/db'
import { vkUser } from '@/db/schema'
import type { AppRouteHandler } from '@/lib/types'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import * as HttpStatusPhrases from 'stoker/http-status-phrases'

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const vkUsers = await db.query.vkUser.findMany()
  return c.json(vkUsers)
}

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const newVkUser = c.req.valid('json')
  const [insertedVkUser] = await db.insert(vkUser).values(newVkUser).returning()
  return c.json(insertedVkUser, HttpStatusCodes.OK)
}

export const get: AppRouteHandler<GetRoute> = async (c) => {
  const { id } = c.req.valid('param')
  const vkUser = await db.query.vkUser.findFirst({
    where(fields, operators) {
      return operators.eq(fields.id, id)
    },
  })
  if (!vkUser) {
    return c.json(
      {
        message: HttpStatusPhrases.NOT_FOUND,
      },
      HttpStatusCodes.NOT_FOUND
    )
  }
  return c.json(vkUser, HttpStatusCodes.OK)
}
