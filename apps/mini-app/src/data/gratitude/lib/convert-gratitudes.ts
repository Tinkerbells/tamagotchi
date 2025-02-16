import dayjs from 'dayjs'

import type { FetchedGratitudes } from '../dto'

import 'dayjs/locale/ru'

dayjs.locale('ru')

const DAYS_IN_WEEK = 7

export function convertGratitudes(gratitudesRecords: FetchedGratitudes) {
  const lastWeek = Array.from({ length: DAYS_IN_WEEK }, (_, i) => {
    const date = dayjs().subtract(i, 'day')
    return {
      day: date.format('D'),
      month: date.format('MMM').slice(0, 3),
      progress: 0,
    }
  }).reverse()

  const currentDate = dayjs().format('D')
  const currentMonth = dayjs().format('MMM').slice(0, 3)

  const currentGratitudes = gratitudesRecords.filter((r) => {
    const recordDate = dayjs(r.createdAt)
    return (
      recordDate.format('D') === currentDate
      && recordDate.format('MMM').slice(0, 3) === currentMonth
    )
  })

  const gratitudesData = lastWeek.map(({ day, month }) => {
    const record = gratitudesRecords.find((r) => {
      const recordDate = dayjs(r.createdAt)
      return (
        recordDate.format('D') === day
        && recordDate.format('MMM').slice(0, 3) === month
      )
    })

    const progress = record ? 1 : 0

    return { day, month, progress }
  })

  return { data: gratitudesData, current: currentGratitudes }
}
