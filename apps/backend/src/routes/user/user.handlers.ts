import type { CreateRoute, ListRoute, GetOneRoute } from './user.routes'
import { db } from '@/db'
import { user } from '@/db/schema'
import type { AppRouteHandler } from '@/lib/types'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import * as HttpStatusPhrases from 'stoker/http-status-phrases'

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const users = await db.query.user.findMany()
  return c.json(users)
}

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const newUser = c.req.valid('json')
  const [inserted] = await db.insert(user).values(newUser).returning()
  return c.json(inserted, HttpStatusCodes.OK)
}

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
  const { id } = c.req.valid('param')
  const user = await db.query.user.findFirst({
    where(fields, operators) {
      return operators.eq(fields.vkId, id.toString())
    },
  })

  if (!user) {
    return c.json(
      {
        message: HttpStatusPhrases.NOT_FOUND,
      },
      HttpStatusCodes.NOT_FOUND
    )
  }

  return c.json(user, HttpStatusCodes.OK)
}
