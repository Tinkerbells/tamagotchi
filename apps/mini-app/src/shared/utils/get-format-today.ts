import dayjs from 'dayjs'
import 'dayjs/locale/ru'

dayjs.locale('ru')

export function getFormatToday() {
  const formattedDate = dayjs().format('D MMMM')
  return formattedDate
}
