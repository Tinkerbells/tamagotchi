import { convertResources, getResources, getWaterRecords } from './lib'
import type {
  GetRoute,
  GetStatisticsRoute,
  GetWaterRoute,
  GetNormsRoute,
  UpdateWaterRoute,
} from './resources.routes'
import { db } from '@/db'
import { meditation, water } from '@/db/schema'
import { ZOD_ERROR_CODES, ZOD_ERROR_MESSAGES } from '@/lib/constants'
import type { AppRouteHandler } from '@/lib/types'
import { sql, eq, and } from 'drizzle-orm'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import * as HttpStatusPhrases from 'stoker/http-status-phrases'

export const get: AppRouteHandler<GetRoute> = async (c) => {
  const { id } = c.req.valid('param')
  const { resources, norms } = await getResources(id)
  const convertedResources = convertResources(resources, norms)
  return c.json(convertedResources, HttpStatusCodes.OK)
}

export const updateWater: AppRouteHandler<UpdateWaterRoute> = async (c) => {
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

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const existingWater = await db.query.water.findFirst({
    where(fields, operators) {
      return operators.and(
        operators.eq(fields.userId, id),
        operators.gte(fields.createdAt, today),
        operators.lt(fields.createdAt, today)
      )
    },
  })

  if (existingWater) {
    const [updatedWater] = await db
      .update(water)
      .set(updates)
      .where(and(eq(water.id, existingWater.id)))
      .returning()
    if (!updatedWater) {
      return c.json(
        {
          message: HttpStatusPhrases.NOT_FOUND,
        },
        HttpStatusCodes.NOT_FOUND
      )
    }
    return updatedWater
  } else {
    const [createdWater] = await db.insert(water).values(updates).returning()
    if (!createdWater) {
      return c.json(
        {
          message: HttpStatusPhrases.NOT_FOUND,
        },
        HttpStatusCodes.NOT_FOUND
      )
    }
    return createWater
  }
}

export const getNorms: AppRouteHandler<GetNormsRoute> = async (c) => {
  const { id } = c.req.valid('param')
  const norms = await db.query.norms.findFirst({
    where(fields, operators) {
      return operators.and(operators.eq(fields.userId, id))
    },
  })
  return c.json(norms, HttpStatusCodes.OK)
}

export const getWater: AppRouteHandler<GetWaterRoute> = async (c) => {
  const { id } = c.req.valid('param')
  const water = await getWaterRecords(id)
  return c.json(water, HttpStatusCodes.OK)
}

export const getStatistics: AppRouteHandler<GetStatisticsRoute> = async (c) => {
  const { id } = c.req.valid('param')
  const meditationTimeValues = await db
    .select({
      totalMeditationTime: sql<
        number | null
      >`SUM(EXTRACT(EPOCH FROM (${meditation.updatedAt} - ${meditation.createdAt})))`,
    })
    .from(meditation)
    .where(and(eq(meditation.finished, true), eq(meditation.userId, id)))
    .execute()

  const walkingDistance = await db.query.walking.findMany({
    where(fields, operators) {
      return operators.and(
        operators.eq(fields.userId, id),
        operators.eq(fields.finished, true)
      )
    },
  })

  const gratitudes = await db.query.gratitude.findMany({
    where(fields, operators) {
      return operators.and(operators.eq(fields.userId, id))
    },
  })

  const totalMeditationTime = meditationTimeValues.reduce(
    (sum, current) => sum + (current.totalMeditationTime ?? 0),
    0
  )

  const totalWalkingDistance = walkingDistance.reduce(
    (sum, current) => sum + (current.currentValue ?? 0),
    0
  )

  return c.json(
    {
      meditation: totalMeditationTime,
      walking: totalWalkingDistance,
      gratitude: gratitudes.length,
    },
    HttpStatusCodes.OK
  )
}
