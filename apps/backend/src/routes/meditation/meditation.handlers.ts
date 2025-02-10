import type { GetRoute, CreateRoute } from './meditation.routes'
import { db } from '@/db'
import { meditation } from '@/db/schema'
import type { AppRouteHandler } from '@/lib/types'
import dayjs from 'dayjs'
import * as HttpStatusCodes from 'stoker/http-status-codes'

export const get: AppRouteHandler<GetRoute> = async (c) => {
  const { id } = c.req.valid('param')
  const startOfToday = dayjs().startOf('day').format('YYYY-MM-DD')
  const startOfNextDay = dayjs(startOfToday).add(1, 'day').format('YYYY-MM-DD')
  const startOfLast7Days = dayjs(startOfToday)
    .subtract(7, 'day')
    .format('YYYY-MM-DD')

  const meditations = await db.query.meditation.findMany({
    where(fields, operators) {
      return operators.and(
        operators.eq(fields.userId, id),
        operators.gte(fields.date, startOfLast7Days),
        operators.lt(fields.date, startOfNextDay)
      )
    },
    orderBy: (fields) => fields.date,
  })

  return c.json(meditations, HttpStatusCodes.OK)
}

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const newMeditation = c.req.valid('json')

  const [createdMeditation] = await db
    .insert(meditation)
    .values(newMeditation)
    .returning()

  return c.json(createdMeditation, HttpStatusCodes.CREATED)
}

