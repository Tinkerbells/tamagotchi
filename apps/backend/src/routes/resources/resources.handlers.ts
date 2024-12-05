import type { UpdateRoute, GetRoute, CreateRoute } from './resources.routes'
import { db } from '@/db'
import { resources } from '@/db/schema'
import { ZOD_ERROR_CODES, ZOD_ERROR_MESSAGES } from '@/lib/constants'
import type { AppRouteHandler } from '@/lib/types'
import { eq } from 'drizzle-orm'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import * as HttpStatusPhrases from 'stoker/http-status-phrases'

export const get: AppRouteHandler<GetRoute> = async (c) => {
  const { id } = c.req.valid('param')
  const resources = await db.query.resources.findFirst({
    where(fields, operators) {
      return operators.eq(fields.userId, id)
    },
  })

  if (!resources) {
    return c.json(
      {
        message: HttpStatusPhrases.NOT_FOUND,
      },
      HttpStatusCodes.NOT_FOUND
    )
  }

  return c.json(resources, HttpStatusCodes.OK)
}

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const newResources = c.req.valid('json')
  const [inserted] = await db.insert(resources).values(newResources).returning()
  return c.json(inserted, HttpStatusCodes.OK)
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
  const [updatedResources] = await db
    .update(resources)
    .set(updates)
    .where(eq(resources.userId, id))
    .returning()

  if (!updatedResources) {
    return c.json(
      {
        message: HttpStatusPhrases.NOT_FOUND,
      },
      HttpStatusCodes.NOT_FOUND
    )
  }

  return c.json(updatedResources, HttpStatusCodes.OK)
}
