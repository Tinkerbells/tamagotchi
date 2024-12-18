import { db } from '@/db'

export const getResrouces = async (id: number) => {
  const now = new Date()
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  )
  const endOfToday = new Date(startOfToday)
  endOfToday.setDate(startOfToday.getDate() + 1)

  const meal = await db.query.meal.findFirst({
    where(fields, operators) {
      return operators.and(
        operators.eq(fields.userId, id),
        operators.gte(fields.createdAt, startOfToday),
        operators.lt(fields.createdAt, endOfToday)
      )
    },
  })
  const water = await db.query.water.findFirst({
    where(fields, operators) {
      return operators.and(
        operators.eq(fields.userId, id),
        operators.gte(fields.createdAt, startOfToday),
        operators.lt(fields.createdAt, endOfToday)
      )
    },
  })
  const meditation = await db.query.meditation.findFirst({
    where(fields, operators) {
      return operators.and(
        operators.eq(fields.userId, id),
        operators.gte(fields.createdAt, startOfToday),
        operators.lt(fields.createdAt, endOfToday)
      )
    },
  })
  const gratitude = await db.query.gratitude.findMany({
    where(fields, operators) {
      return operators.and(
        operators.eq(fields.userId, id),
        operators.gte(fields.createdAt, startOfToday),
        operators.lt(fields.createdAt, endOfToday)
      )
    },
  })
  const walking = await db.query.walking.findFirst({
    where(fields, operators) {
      return operators.and(
        operators.eq(fields.userId, id),
        operators.gte(fields.createdAt, startOfToday),
        operators.lt(fields.createdAt, endOfToday)
      )
    },
  })
  const sleep = await db.query.sleep.findFirst({
    where(fields, operators) {
      return operators.and(
        operators.eq(fields.userId, id),
        operators.gte(fields.createdAt, startOfToday),
        operators.lt(fields.createdAt, endOfToday)
      )
    },
  })
  const norms = await db.query.norms.findFirst({
    where(fields, operators) {
      return operators.and(operators.eq(fields.userId, id))
    },
  })

  const resources = { meal, water, meditation, gratitude, walking, sleep }
  return { resources, norms }
}
