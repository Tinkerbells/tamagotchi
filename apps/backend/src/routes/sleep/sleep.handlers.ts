import type { GetRoute, UpdateRoute } from './sleep.routes'
import { db } from '@/db'
import { sleep } from '@/db/schema'
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

  const sleep = await db.query.sleep.findMany({
    where(fields, operators) {
      return operators.and(
        operators.eq(fields.userId, id),
        operators.gte(fields.date, startOfLast7Days),
        operators.lt(fields.date, startOfNextDay) // Use lt instead of lte
      )
    },
    orderBy: (fields) => fields.date,
  })

  return c.json(sleep, HttpStatusCodes.OK)
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

  const existingSleep = await db.query.sleep.findFirst({
    where(fields, operators) {
      return operators.and(
        operators.eq(fields.userId, id),
        operators.eq(fields.date, today)
      )
    },
  })

  if (existingSleep) {
    const [updatedSleep] = await db
      .update(sleep)
      .set(updates)
      .where(eq(sleep.id, existingSleep.id))
      .returning()

    if (!updatedSleep) {
      return c.json(
        { message: HttpStatusPhrases.NOT_FOUND },
        HttpStatusCodes.NOT_FOUND
      )
    }
    return c.json(updatedSleep, HttpStatusCodes.OK)
  } else {
    const newSleepEntry = { ...updates, userId: id, date: today }
    const [createdSleep] = await db
      .insert(sleep)
      .values(newSleepEntry)
      .returning()

    if (!createdSleep) {
      return c.json(
        { message: HttpStatusPhrases.NOT_FOUND },
        HttpStatusCodes.NOT_FOUND
      )
    }
    return c.json(createdSleep, HttpStatusCodes.CREATED)
  }
}
