export const getCurrentSleepValue = (progress: number, dailyNorm: number) => {
  return Math.floor((progress * dailyNorm) / 100)
}
