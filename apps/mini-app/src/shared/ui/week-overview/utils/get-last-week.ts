import dayjs from 'dayjs'
import 'dayjs/locale/ru'

dayjs.locale('ru')

export const getLastWeek = () => {
  return Array.from({ length: 7 }, (_, i) => {
    const date = dayjs().subtract(i, 'day')
    return {
      value: date.format('D'),
      month: date.format('MMM').slice(0, 3),
    }
  }).reverse()
}
