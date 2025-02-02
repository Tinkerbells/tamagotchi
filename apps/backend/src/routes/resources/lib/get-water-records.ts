import { db } from '@/db'

export const getWaterRecords = async (id: number) => {
  const now = new Date()
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  )
  const startOfLast7Days = new Date(startOfToday)
  startOfLast7Days.setDate(startOfToday.getDate() - 6)
  const norms = await db.query.norms.findFirst({
    where(fields, operators) {
      return operators.and(operators.eq(fields.userId, id))
    },
  })

  const dailyNorm = norms || { waterDailyNorm: 750, sleepDailyNorm: 8 }

  const waterRecords = await db.query.water.findMany({
    where(fields, operators) {
      return operators.and(
        operators.eq(fields.userId, id),
        operators.gte(fields.createdAt, startOfLast7Days),
        operators.lt(fields.createdAt, startOfToday)
      )
    },
    orderBy: (fields) => fields.createdAt,
  })

  const waterRecordsWithNorm = waterRecords.map((record) => ({
    ...record,
    dailyNorm: dailyNorm.waterDailyNorm,
  }))
  return waterRecordsWithNorm
}
