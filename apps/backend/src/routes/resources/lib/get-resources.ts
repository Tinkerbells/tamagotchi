import { db } from '@/db'
import dayjs from 'dayjs'

export const getResources = async (id: number) => {
  const startOfToday = dayjs().startOf('day').format('YYYY-MM-DD')
  const startOfNextDay = dayjs(startOfToday).add(1, 'day').format('YYYY-MM-DD')

  const meal = await db.query.meal.findFirst({
    where(fields, operators) {
      return operators.and(
        operators.eq(fields.userId, id),
        operators.gte(fields.date, startOfToday),
        operators.lt(fields.date, startOfNextDay)
      )
    },
  })
  const water = await db.query.water.findFirst({
    where(fields, operators) {
      return operators.and(
        operators.eq(fields.userId, id),
        operators.gte(fields.date, startOfToday),
        operators.lt(fields.date, startOfNextDay)
      )
    },
  })
  const meditation = await db.query.meditation.findFirst({
    where(fields, operators) {
      return operators.and(
        operators.eq(fields.userId, id),
        operators.gte(fields.date, startOfToday),
        operators.lt(fields.date, startOfNextDay)
      )
    },
  })
  const gratitude = await db.query.gratitude.findMany({
    where(fields, operators) {
      return operators.and(
        operators.eq(fields.userId, id),
        operators.gte(fields.date, startOfToday),
        operators.lt(fields.date, startOfNextDay)
      )
    },
  })
  const walking = await db.query.walking.findFirst({
    where(fields, operators) {
      return operators.and(
        operators.eq(fields.userId, id),
        operators.gte(fields.date, startOfToday),
        operators.lt(fields.date, startOfNextDay)
      )
    },
  })
  const sleep = await db.query.sleep.findFirst({
    where(fields, operators) {
      return operators.and(
        operators.eq(fields.userId, id),
        operators.gte(fields.date, startOfToday),
        operators.lt(fields.date, startOfNextDay)
      )
    },
  })
  const norms = await db.query.norms.findFirst({
    where(fields, operators) {
      return operators.eq(fields.userId, id)
    },
  })

  const resources = {
    meal,
    water,
    meditation,
    gratitude,
    walking,
    sleep,
  }

  return { resources, norms: norms! }
}
