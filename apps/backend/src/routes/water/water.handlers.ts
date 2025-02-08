import type { GetRoute, UpdateRoute } from './water.routes'
import { db } from '@/db'
import { water } from '@/db/schema'
import { ZOD_ERROR_CODES, ZOD_ERROR_MESSAGES } from '@/lib/constants'
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

  const water = await db.query.water.findMany({
    where(fields, operators) {
      return operators.and(
        operators.eq(fields.userId, id),
        operators.gte(fields.date, startOfLast7Days),
        operators.lt(fields.date, startOfNextDay) // Use lt instead of lte
      )
    },
    orderBy: (fields) => fields.date,
  })

  return c.json(water, HttpStatusCodes.OK)
}

export const update: AppRouteHandler<UpdateRoute> = async (c) => {
  const { id } = c.req.valid('param')
  const updates = c.req.valid('json')

  if (Object.keys(updates).length === 0) {
    return c.json(
      {
        success: false,
        error: {
          issues: [
            {
              code: ZOD_ERROR_CODES.INVALID_UPDATES,
              path: [],
              message: ZOD_ERROR_MESSAGES.NO_UPDATES,
            },
          ],
          name: 'ZodError',
        },
      },
      HttpStatusCodes.UNPROCESSABLE_ENTITY
    )
  }

  const today = dayjs().format('YYYY-MM-DD') // Get today's date in YYYY-MM-DD format

  const existingWater = await db.query.water.findFirst({
    where(fields, operators) {
      return operators.and(
        operators.eq(fields.userId, id),
        operators.eq(fields.date, today)
      )
    },
  })

  if (existingWater) {
    const [updatedWater] = await db
      .update(water)
      .set(updates)
      .where(eq(water.id, existingWater.id))
      .returning()

    if (!updatedWater) {
      return c.json(
        { message: HttpStatusPhrases.NOT_FOUND },
        HttpStatusCodes.NOT_FOUND
      )
    }
    return c.json(updatedWater, HttpStatusCodes.OK)
  } else {
    const newWaterEntry = { ...updates, userId: id, date: today }
    const [createdWater] = await db
      .insert(water)
      .values(newWaterEntry)
      .returning()

    if (!createdWater) {
      return c.json(
        { message: HttpStatusPhrases.NOT_FOUND },
        HttpStatusCodes.NOT_FOUND
      )
    }
    return c.json(createdWater, HttpStatusCodes.CREATED)
  }
}
