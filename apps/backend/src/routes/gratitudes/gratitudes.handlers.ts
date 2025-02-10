import type { GetRoute, CreateRoute, RemoveRoute } from './gratitudes.routes'
import { db } from '@/db'
import { gratitude } from '@/db/schema'
import type { AppRouteHandler } from '@/lib/types'
import dayjs from 'dayjs'
import { eq } from 'drizzle-orm'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import * as HttpStatusPhrases from 'stoker/http-status-phrases'

export const get: AppRouteHandler<GetRoute> = async (c) => {
  const { id } = c.req.valid('param')
  const startOfToday = dayjs().startOf('day').format('YYYY-MM-DD')
  const startOfNextDay = dayjs(startOfToday).add(1, 'day').format('YYYY-MM-DD')
  const startOfLast7Days = dayjs(startOfToday)
    .subtract(7, 'day')
    .format('YYYY-MM-DD')

  const gratitudes = await db.query.gratitude.findMany({
    where(fields, operators) {
      return operators.and(
        operators.eq(fields.userId, id),
        operators.gte(fields.date, startOfLast7Days),
        operators.lt(fields.date, startOfNextDay)
      )
    },
    orderBy: (fields) => fields.date,
  })

  return c.json(gratitudes, HttpStatusCodes.OK)
}

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const newGratitude = c.req.valid('json')

  const [createdgratitude] = await db
    .insert(gratitude)
    .values(newGratitude)
    .returning()

  return c.json(createdgratitude, HttpStatusCodes.CREATED)
}

export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
  const { id } = c.req.valid('param')

  const [deletedGratitude] = await db
    .delete(gratitude)
    .where(eq(gratitude.id, id))
    .returning()

  if (!deletedGratitude) {
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND
    )
  }

  return c.json(deletedGratitude, HttpStatusCodes.OK)
}
