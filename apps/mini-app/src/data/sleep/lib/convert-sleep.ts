import { FetchedSleep } from '../dto'
import { FetchedNorms } from '@/data/resources'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'

dayjs.locale('ru')

export const convertSleep = (
  sleepRecords: FetchedSleep,
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

  const sleepData = lastWeek.map((day) => {
    const record = sleepRecords.find(
      (r) =>
        dayjs(r.createdAt).format('D') === day.day &&
        dayjs(r.createdAt).format('MMM').slice(0, 3) === day.month
    )

    return {
      ...day,
      progress: record
        ? (record.currentValue / (norms.sleepDailyNorm || 750)) * 100
        : 0,
    }
  })
  return {
    sleepData,
    currentValue: getCurrentValue(sleepRecords),
    dailyNorm: norms.sleepDailyNorm,
  }
}

const getCurrentValue = (records: FetchedSleep) => {
  if (records.length === 0) {
    return 0
  }

  const lastRecord = records[records.length - 1]
  const lastRecordDate = dayjs(lastRecord.createdAt).format('YYYY-MM-DD')
  const todayDate = dayjs().format('YYYY-MM-DD')

  return lastRecordDate === todayDate ? lastRecord.currentValue : 0
}
