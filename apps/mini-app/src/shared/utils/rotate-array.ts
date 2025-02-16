export function rotateArray<T>(arr: T[]): T[] {
  if (arr.length === 0)
    return arr
  return [...arr.slice(1), arr[0]]
}
