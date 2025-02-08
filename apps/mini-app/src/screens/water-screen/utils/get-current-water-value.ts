export const getCurrentWaterValue = (progress: number, dailyNorm: number) => {
  return Math.floor((progress * dailyNorm) / 100)
}
