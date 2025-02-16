import { STORAGE_KEY } from '../hooks/use-meditation-timer'

export function getIsTimer() {
  return !!localStorage.getItem(STORAGE_KEY)
}
