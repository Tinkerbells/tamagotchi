import { FetchedGratitudes } from '../dto'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'

dayjs.locale('ru')

const DAYS_IN_WEEK = 7

export const convertGratitudes = (gratitudesRecords: FetchedGratitudes) => {
  const lastWeek = Array.from({ length: DAYS_IN_WEEK }, (_, i) => {
    const date = dayjs().subtract(i, 'day')
    return {
      day: date.format('D'),
      month: date.format('MMM').slice(0, 3),
      progress: 0,
    }
  }).reverse()

  const gratitudesData = lastWeek.map(({ day, month }) => {
    const record = gratitudesRecords.find((r) => {
      const recordDate = dayjs(r.createdAt)
      return (
        recordDate.format('D') === day &&
        recordDate.format('MMM').slice(0, 3) === month
      )
    })

    const progress = Boolean(record) ? 1 : 0

    return { day, month, progress }
  })

  return {
    data: gratitudesData,
  }
}
