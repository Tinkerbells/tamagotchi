import type { UpdateRoute, GetRoute } from './achievements.routes'
import { db } from '@/db'
import { achievements, userAchievements } from '@/db/schema'
import { ZOD_ERROR_CODES, ZOD_ERROR_MESSAGES } from '@/lib/constants'
import type { AppRouteHandler } from '@/lib/types'
import { eq, sql } from 'drizzle-orm'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import * as HttpStatusPhrases from 'stoker/http-status-phrases'

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
  const [updatedAchievements] = await db
    .update(userAchievements)
    .set(updates)
    .where(eq(userAchievements.userId, id))
    .returning()

  if (!updatedAchievements) {
    return c.json(
      {
        message: HttpStatusPhrases.NOT_FOUND,
      },
      HttpStatusCodes.NOT_FOUND
    )
  }

  return c.json(updatedAchievements, HttpStatusCodes.OK)
}

export const get: AppRouteHandler<GetRoute> = async (c) => {
  const { id } = c.req.valid('param')
  const result = await db
    .select({
      id: achievements.id,
      title: achievements.title,
      description: achievements.description,
      icon: achievements.icon,
      isUnlocked: sql<boolean>`CASE WHEN ${userAchievements.id} IS NOT NULL THEN true ELSE false END`,
    })
    .from(achievements)
    .leftJoin(
      userAchievements,
      sql`${achievements.id} = ${userAchievements.achievementId} AND ${userAchievements.userId} = ${id}`
    )

  if (!result) {
    return c.json(
      {
        message: HttpStatusPhrases.NOT_FOUND,
      },
      HttpStatusCodes.NOT_FOUND
    )
  }

  return c.json(result, HttpStatusCodes.OK)
}
