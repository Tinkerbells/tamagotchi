export function isUserMoodEnabled() {
  const moodCreatedDate = localStorage.getItem('mood_created')

  if (!moodCreatedDate) {
    return false // No mood created yet
  }

  const today = new Date()
  const createdDate = new Date(moodCreatedDate)

  // Check if the year, month, and date are the same
  return (
    today.getFullYear() === createdDate.getFullYear()
    && today.getMonth() === createdDate.getMonth()
    && today.getDate() === createdDate.getDate()
  )
}
