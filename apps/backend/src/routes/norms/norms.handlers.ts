import type { GetRoute, UpdateRoute } from './norms.routes'
import { db } from '@/db'
import { norms } from '@/db/schema'
import { ZOD_ERROR_CODES, ZOD_ERROR_MESSAGES } from '@/lib/constants'
import type { AppRouteHandler } from '@/lib/types'
import { eq } from 'drizzle-orm'
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

  const [updatedNorms] = await db
    .update(norms)
    .set(updates)
    .where(eq(norms.userId, id))
    .returning()
  if (!updatedNorms) {
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND
    )
  }
  return c.json(updatedNorms, HttpStatusCodes.OK)
}

export const get: AppRouteHandler<GetRoute> = async (c) => {
  const { id } = c.req.valid('param')
  const norms = await db.query.norms.findFirst({
    where(fields, operators) {
      return operators.and(operators.eq(fields.userId, id))
    },
  })
  return c.json(norms, HttpStatusCodes.OK)
}
