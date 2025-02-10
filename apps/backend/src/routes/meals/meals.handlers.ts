import type { GetRoute, UpdateRoute } from './meals.routes'
import { db } from '@/db'
import { meal } from '@/db/schema'
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

  const meal = await db.query.meal.findMany({
    where(fields, operators) {
      return operators.and(
        operators.eq(fields.userId, id),
        operators.gte(fields.date, startOfLast7Days),
        operators.lt(fields.date, startOfNextDay) // Use lt instead of lte
      )
    },
    orderBy: (fields) => fields.date,
  })

  return c.json(meal, HttpStatusCodes.OK)
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

  const existingMeal = await db.query.meal.findFirst({
    where(fields, operators) {
      return operators.and(
        operators.eq(fields.userId, id),
        operators.eq(fields.date, today)
      )
    },
  })

  if (existingMeal) {
    const [updatedMeal] = await db
      .update(meal)
      .set(updates)
      .where(eq(meal.id, existingMeal.id))
      .returning()

    if (!updatedMeal) {
      return c.json(
        { message: HttpStatusPhrases.NOT_FOUND },
        HttpStatusCodes.NOT_FOUND
      )
    }
    return c.json(updatedMeal, HttpStatusCodes.OK)
  } else {
    const newMealEntry = { ...updates, userId: id, date: today }
    const [createdMeal] = await db.insert(meal).values(newMealEntry).returning()

    if (!createdMeal) {
      return c.json(
        { message: HttpStatusPhrases.NOT_FOUND },
        HttpStatusCodes.NOT_FOUND
      )
    }
    return c.json(createdMeal, HttpStatusCodes.CREATED)
  }
}
