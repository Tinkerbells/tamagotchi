import { convertResources, getResources, getWaterRecords } from './lib'
import type {
  GetRoute,
  GetStatisticsRoute,
  GetWaterRoute,
} from './resources.routes'
import { db } from '@/db'
import { meditation } from '@/db/schema'
import type { AppRouteHandler } from '@/lib/types'
import { sql, eq, and } from 'drizzle-orm'
import * as HttpStatusCodes from 'stoker/http-status-codes'

export const get: AppRouteHandler<GetRoute> = async (c) => {
  const { id } = c.req.valid('param')
  const { resources, norms } = await getResources(id)
  const convertedResources = convertResources(resources, norms)
  return c.json(convertedResources, HttpStatusCodes.OK)
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
