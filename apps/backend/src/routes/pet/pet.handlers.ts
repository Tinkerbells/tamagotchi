import type { CreateRoute, GetOneRoute, UpdateRoute } from './pet.routes'
import { db } from '@/db'
import { pet } from '@/db/schema'
import { ZOD_ERROR_CODES, ZOD_ERROR_MESSAGES } from '@/lib/constants'
import type { AppRouteHandler } from '@/lib/types'
import { eq } from 'drizzle-orm'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import * as HttpStatusPhrases from 'stoker/http-status-phrases'

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const newPet = c.req.valid('json')
  const [inserted] = await db.insert(pet).values(newPet).returning()
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
  const [updatedPet] = await db
    .update(pet)
    .set(updates)
    .where(eq(pet.userId, id))
    .returning()

  if (!updatedPet) {
    return c.json(
      {
        message: HttpStatusPhrases.NOT_FOUND,
      },
      HttpStatusCodes.NOT_FOUND
    )
  }

  return c.json(updatedPet, HttpStatusCodes.OK)
}

export const get: AppRouteHandler<GetOneRoute> = async (c) => {
  const { id } = c.req.valid('param')
  const pet = await db.query.pet.findFirst({
    where(fields, operators) {
      return operators.eq(fields.userId, id)
    },
  })
  const petAccessory = await db.query.purchasedAccessories.findFirst({
    where(fields, operators) {
      return operators.and(
        operators.eq(fields.userId, id),
        operators.eq(fields.isActive, true)
      )
    },
  })

  const petInteriorItems = await db.query.purchasedAccessories.findMany({
    where(fields, operators) {
      return operators.and(
        operators.eq(fields.userId, id),
        operators.eq(fields.isActive, true)
      )
    },
  })

  if (!pet) {
    return c.json(
      {
        message: HttpStatusPhrases.NOT_FOUND,
      },
      HttpStatusCodes.NOT_FOUND
    )
  }

  const result = {
    pet: pet,
    accessory: petAccessory,
    iterior_items: petInteriorItems,
  }

  return c.json(result, HttpStatusCodes.OK)
}
