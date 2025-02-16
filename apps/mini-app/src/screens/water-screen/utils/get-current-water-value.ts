export function getCurrentWaterValue(progress: number, dailyNorm: number) {
  return Math.floor((progress * dailyNorm) / 100)
}
