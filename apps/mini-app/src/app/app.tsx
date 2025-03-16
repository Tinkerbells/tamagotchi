import { Route, Routes } from 'react-router-dom'

import { AchievementsScreen } from '@/screens/achievements-screen'
import { MusicPlayerProvider, withAchievementCheck } from '@/shared'
import {
  GratitudeScreen,
  HomeScreen,
  MealsScreen,
  MeditationScreen,
  PetCreationScreen,
  ProfileScreen,
  ShopScreen,
  SleepScreen,
  StartScreen,
  WalkingScreen,
  WaterScreen,
} from '@/screens'

import { Layout } from './layout'
import { routes } from './routes'
import { AppProvider } from './app-provider'
import { ProtectedRoute } from './protected-route'

export function App() {
  // Define which screens should check for achievements
  const checkAchievements = {
    checkOnMount: true,
  }

  return (
    <AppProvider>
      <MusicPlayerProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={(
                <ProtectedRoute>
                  {/* Check achievements when returning home */}
                  {withAchievementCheck(HomeScreen, checkAchievements)({})}
                </ProtectedRoute>
              )}
            />
            <Route
              path={routes.profile}
              element={(
                <ProtectedRoute>
                  <ProfileScreen />
                </ProtectedRoute>
              )}
            />
            <Route
              path={routes.achievements}
              element={(
                <ProtectedRoute>
                  {/* Check achievements when viewing the achievements page */}
                  {withAchievementCheck(AchievementsScreen, checkAchievements)({})}
                </ProtectedRoute>
              )}
            />
            <Route
              path={routes.shop}
              element={(
                <ProtectedRoute>
                  <ShopScreen />
                </ProtectedRoute>
              )}
            />
            <Route
              path={routes.water}
              element={(
                <ProtectedRoute>
                  {withAchievementCheck(WaterScreen, checkAchievements)({})}
                </ProtectedRoute>
              )}
            />
            <Route
              path={routes.sleep}
              element={(
                <ProtectedRoute>
                  {withAchievementCheck(SleepScreen, checkAchievements)({})}
                </ProtectedRoute>
              )}
            />
            <Route
              path={routes.meditation}
              element={(
                <ProtectedRoute>
                  {withAchievementCheck(MeditationScreen, checkAchievements)({})}
                </ProtectedRoute>
              )}
            />
            <Route
              path={routes.meals}
              element={(
                <ProtectedRoute>
                  {withAchievementCheck(MealsScreen, checkAchievements)({})}
                </ProtectedRoute>
              )}
            />
            <Route
              path={routes.gratitude}
              element={(
                <ProtectedRoute>
                  {withAchievementCheck(GratitudeScreen, checkAchievements)({})}
                </ProtectedRoute>
              )}
            />
            <Route
              path={routes.walking}
              element={(
                <ProtectedRoute>
                  {withAchievementCheck(WalkingScreen, checkAchievements)({})}
                </ProtectedRoute>
              )}
            />
            <Route path={routes.createPet} element={<PetCreationScreen />} />
            <Route path={routes.onboarding} element={<StartScreen />} />
            <Route path="*" element={<div>Not found</div>} />
          </Route>
        </Routes>
      </MusicPlayerProvider>
    </AppProvider>
  )
}
