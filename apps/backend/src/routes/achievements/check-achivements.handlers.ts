import { db } from '@/db'
import { 
  achievements, 
  userAchievements, 
  walking, 
  meditation, 
  water, 
  user,
  userMood
} from '@/db/schema'
import type { AppRouteHandler } from '@/lib/types'
import { eq, count, sql, gte, and, desc } from 'drizzle-orm'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import dayjs from 'dayjs'
import { CheckAchievementsRoute } from './achievements.routes'

// Achievement IDs from the image
const ACHIEVEMENTS = {
  FIRST_WALK: 1, // Первый шаг
  MEDITATION_MASTER: 2, // Мастер медитаций
  CARING_OWNER: 3, // Заботливый хозяин
  STREET_CONQUEROR: 4, // Покоритель улиц
  FOREVER_FRIEND: 5, // Друг навсегда
  BOREDOM_SAVIOR: 6 // Спасение от скуки
}

export const checkAchievements: AppRouteHandler<CheckAchievementsRoute> = async (c) => {
  const { id } = c.req.valid('param')
  const userId = Number(id)
  
  // Get user's existing achievements to avoid duplicates
  const existingAchievements = await db.query.userAchievements.findMany({
    where: eq(userAchievements.userId, userId),
    columns: {
      achievementId: true
    }
  })
  
  const existingAchievementIds = new Set(
    existingAchievements.map(ach => ach.achievementId)
  )
  
  // Array to collect newly earned achievements
  const newAchievements = []
  
  // Check for First Walk achievement
  if (!existingAchievementIds.has(ACHIEVEMENTS.FIRST_WALK)) {
    const walkCount = await db.query.walking.findFirst({
      where: eq(walking.userId, userId)
    })
    
    if (walkCount) {
      await awardAchievement(userId, ACHIEVEMENTS.FIRST_WALK)
      newAchievements.push(ACHIEVEMENTS.FIRST_WALK)
    }
  }
  
  // Check for Meditation Master achievement (10 meditations)
  if (!existingAchievementIds.has(ACHIEVEMENTS.MEDITATION_MASTER)) {
    const meditationCount = await db.query.meditation.findMany({
      where: eq(meditation.userId, userId)
    })
    
    if (meditationCount.length >= 10) {
      await awardAchievement(userId, ACHIEVEMENTS.MEDITATION_MASTER)
      newAchievements.push(ACHIEVEMENTS.MEDITATION_MASTER)
    }
  }
  
  // Check for Caring Owner achievement (drink water 5 days in a row)
  if (!existingAchievementIds.has(ACHIEVEMENTS.CARING_OWNER)) {
    const waterEntries = await db.query.water.findMany({
      where: eq(water.userId, userId),
      orderBy: [desc(water.date)]
    })
    
    // Check for 5 consecutive days with water entries
    let consecutiveDays = 0
    let currentDay = dayjs()
    
    for (let i = 0; i < 5; i++) {
      const dayToCheck = currentDay.subtract(i, 'day').format('YYYY-MM-DD')
      const hasEntry = waterEntries.some(entry => 
        dayjs(entry.date).format('YYYY-MM-DD') === dayToCheck && entry.currentValue > 0
      )
      
      if (hasEntry) {
        consecutiveDays++
      } else {
        break
      }
    }
    
    if (consecutiveDays >= 5) {
      await awardAchievement(userId, ACHIEVEMENTS.CARING_OWNER)
      newAchievements.push(ACHIEVEMENTS.CARING_OWNER)
    }
  }
  
  // Check for Street Conqueror achievement (100 km)
  if (!existingAchievementIds.has(ACHIEVEMENTS.STREET_CONQUEROR)) {
    const walkingEntries = await db.query.walking.findMany({
      where: eq(walking.userId, userId)
    })
    
    const totalDistance = walkingEntries.reduce(
      (sum, entry) => sum + (entry.currentValue || 0), 
      0
    )
    
    if (totalDistance >= 100) {
      await awardAchievement(userId, ACHIEVEMENTS.STREET_CONQUEROR)
      newAchievements.push(ACHIEVEMENTS.STREET_CONQUEROR)
    }
  }
  
  // Check for Forever Friend achievement (30 consecutive days)
  if (!existingAchievementIds.has(ACHIEVEMENTS.FOREVER_FRIEND)) {
    // For this achievement, we need to check if there's any user activity for 30 consecutive days
    // This is complex and would require checking across multiple activity types
    
    // Get the user creation date
    const userData = await db.query.user.findFirst({
      where: eq(user.id, userId)
    })
    
    if (userData) {
      const creationDate = dayjs(userData.createdAt)
      const today = dayjs()
      const daysSinceCreation = today.diff(creationDate, 'day')
      
      // If user has been registered for at least 30 days
      if (daysSinceCreation >= 30) {
        // Check for any activity in the last 30 days
        // This is a simplified check, ideally we would verify activity on each individual day
        const thirtyDaysAgo = today.subtract(30, 'day').format('YYYY-MM-DD')
        
        const recentActivities = await Promise.all([
          db.query.water.findMany({
            where: and(
              eq(water.userId, userId),
              gte(water.date, thirtyDaysAgo)
            )
          }),
          db.query.walking.findMany({
            where: and(
              eq(walking.userId, userId),
              gte(walking.date, thirtyDaysAgo)
            )
          }),
          db.query.meditation.findMany({
            where: and(
              eq(meditation.userId, userId),
              gte(meditation.date, thirtyDaysAgo)
            )
          })
        ])
        
        const hasEnoughActivity = recentActivities.flat().length >= 30
        
        if (hasEnoughActivity) {
          await awardAchievement(userId, ACHIEVEMENTS.FOREVER_FRIEND)
          newAchievements.push(ACHIEVEMENTS.FOREVER_FRIEND)
        }
      }
    }
  }
  
  // Check for Boredom Savior achievement (maximum happiness for a week)
  if (!existingAchievementIds.has(ACHIEVEMENTS.BOREDOM_SAVIOR)) {
    const oneWeekAgo = dayjs().subtract(7, 'day').toDate()
    
    const moodEntries = await db.query.userMood.findMany({
      where: and(
        eq(userMood.userId, userId),
        gte(userMood.createdAt, oneWeekAgo)
      )
    })
    
    // Check if all mood entries in the last week are high (assuming high mood is >= 4 out of 5)
    const allHighMood = moodEntries.length >= 7 && 
      moodEntries.every(entry => entry.moodStatus >= 4)
    
    if (allHighMood) {
      await awardAchievement(userId, ACHIEVEMENTS.BOREDOM_SAVIOR)
      newAchievements.push(ACHIEVEMENTS.BOREDOM_SAVIOR)
    }
  }
  
  // Get the details of earned achievements
  type AchievementDetail = typeof achievements.$inferSelect
  let newAchievementDetails: AchievementDetail[] = []
  
  if (newAchievements.length > 0) {
    newAchievementDetails = await db.query.achievements.findMany({
      where: sql`${achievements.id} IN (${newAchievements.join(',')})`
    })
  }
  
  // Get all user achievements with details
  const allUserAchievements = await db
    .select({
      id: achievements.id,
      title: achievements.title,
      description: achievements.description,
      icon: achievements.icon,
      isUnlocked: sql<boolean>`CASE WHEN ${userAchievements.id} IS NOT NULL THEN true ELSE false END`,
    })
    .from(achievements)
    .leftJoin(
      userAchievements,
      sql`${achievements.id} = ${userAchievements.achievementId} AND ${userAchievements.userId} = ${userId}`
    )
    .orderBy(achievements.id)
  
  return c.json({
    achievements: allUserAchievements,
    newlyEarned: newAchievementDetails
  }, HttpStatusCodes.OK)
}

// Helper function to award an achievement to a user
async function awardAchievement(userId: number, achievementId: number) {
  await db.insert(userAchievements).values({
    userId,
    achievementId
  })
  
  // await db
  //   .update(user)
  //   .set({ 
  //     gems: sql`${user.gems} + 10` // Award 10 gems for each achievement
  //   })
  //   .where(eq(user.id, userId))
}
