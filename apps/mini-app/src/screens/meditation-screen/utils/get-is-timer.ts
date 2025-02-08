import { STORAGE_KEY } from '../hooks/use-meditation-timer'

export const getIsTimer = () => {
  return !!localStorage.getItem(STORAGE_KEY)
}
