import dayjs from 'dayjs'

import type { SelectedMeals } from '@/screens/meals-screen/types'

import type { FetchedMeals } from '../dto'

import 'dayjs/locale/ru'

dayjs.locale('ru')

const DAYS_IN_WEEK = 7
const MEAL_SCORE = 20

export function convertMeals(mealsRecords: FetchedMeals) {
  const lastWeek = Array.from({ length: DAYS_IN_WEEK }, (_, i) => {
    const date = dayjs().subtract(i, 'day')
    return {
      day: date.format('D'),
      month: date.format('MMM').slice(0, 3),
      progress: 0,
    }
  }).reverse()

  const mealsData = lastWeek.map(({ day, month }) => {
    const record = mealsRecords.find((r) => {
      const recordDate = dayjs(r.createdAt)
      return (
        recordDate.format('D') === day
        && recordDate.format('MMM').slice(0, 3) === month
      )
    })

    const progress = record
      ? [
          record.breakfast,
          record.lunch,
          record.dinner,
          record.snack,
          record.afternoon_snack,
        ].filter(Boolean).length * MEAL_SCORE
      : 0

    return { day, month, progress }
  })

  return {
    data: mealsData,
    currentMeals: getCurrentMeals(mealsRecords),
  }
}

function getCurrentMeals(records: FetchedMeals): SelectedMeals {
  const lastRecord = records[records.length - 1]
  if (!lastRecord)
    return emptyMeals()

  return dayjs(lastRecord.createdAt).isSame(dayjs(), 'day')
    ? {
        breakfast: !!lastRecord.breakfast,
        lunch: !!lastRecord.lunch,
        dinner: !!lastRecord.dinner,
        snack: !!lastRecord.snack,
        afternoon_snack: !!lastRecord.afternoon_snack,
      }
    : emptyMeals()
}

function emptyMeals(): SelectedMeals {
  return {
    breakfast: false,
    snack: false,
    lunch: false,
    afternoon_snack: false,
    dinner: false,
  }
}
