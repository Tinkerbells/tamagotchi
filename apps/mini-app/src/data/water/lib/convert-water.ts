import { FetchedWater } from '../dto'
import { FetchedNorms } from '@/data/resources'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'

dayjs.locale('ru')

export const convertWater = (
  waterRecords: FetchedWater,
  norms: FetchedNorms
) => {
  const lastWeek = Array.from({ length: 7 }, (_, i) => {
    const date = dayjs().subtract(i, 'day')
    return {
      day: date.format('D'),
      month: date.format('MMM').slice(0, 3),
      progress: 0,
    }
  }).reverse()

  const weekWaterData = lastWeek.map((day) => {
    const record = waterRecords.find(
      (r) =>
        dayjs(r.createdAt).format('D') === day.day &&
        dayjs(r.createdAt).format('MMM').slice(0, 3) === day.month
    )

    return {
      ...day,
      progress: record
        ? (record.currentValue / (norms.waterDailyNorm || 750)) * 100
        : 0,
    }
  })
  return {
    waterData: weekWaterData,
    currentValue: getCurrentValue(waterRecords),
    dailyNorm: norms.waterDailyNorm,
  }
}

const getCurrentValue = (records: FetchedWater) => {
  if (records.length === 0) {
    return 0
  }

  const lastRecord = records[records.length - 1]
  const lastRecordDate = dayjs(lastRecord.createdAt).format('YYYY-MM-DD')
  const todayDate = dayjs().format('YYYY-MM-DD')

  return lastRecordDate === todayDate ? lastRecord.currentValue : 0
}
