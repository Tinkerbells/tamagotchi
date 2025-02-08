import { convertResources, getResources } from './lib'
import type { GetRoute, GetStatisticsRoute } from './resources.routes'
import { db } from '@/db'
import type { AppRouteHandler } from '@/lib/types'
import * as HttpStatusCodes from 'stoker/http-status-codes'

export const get: AppRouteHandler<GetRoute> = async (c) => {
  const { id } = c.req.valid('param')
  const { resources, norms } = await getResources(id)
  const convertedResources = convertResources(resources, norms)
  return c.json(convertedResources, HttpStatusCodes.OK)
}

export const getStatistics: AppRouteHandler<GetStatisticsRoute> = async (c) => {
  const { id } = c.req.valid('param')

  const meditations = await db.query.walking.findMany({
    where(fields, operators) {
      return operators.and(operators.eq(fields.userId, id))
    },
  })

  const walkings = await db.query.walking.findMany({
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

  const totalWalkingDistance = walkings.reduce(
    (sum, current) => sum + (current.currentValue ?? 0),
    0
  )

  const totalMeditationTime = meditations.length

  return c.json(
    {
      meditation: totalMeditationTime,
      walking: totalWalkingDistance,
      gratitude: gratitudes.length,
    },
    HttpStatusCodes.OK
  )
}
