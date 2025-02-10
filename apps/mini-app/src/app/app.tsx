import { AppProvider } from './app-provider'
import { Layout } from './layout'
import { ProtectedRoute } from './protected-route'
import { routes } from './routes'
import {
  HomeScreen,
  PetCreationScreen,
  ProfileScreen,
  ShopScreen,
  MeditationScreen,
  StartScreen,
  SleepScreen,
  WaterScreen,
  MealsScreen,
} from '@/screens'
import { AchievementsScreen } from '@/screens/achievements-screen'
import { Routes, Route } from 'react-router-dom'

export const App = () => {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <HomeScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path={routes.profile}
            element={
              <ProtectedRoute>
                <ProfileScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path={routes.achievements}
            element={
              <ProtectedRoute>
                <AchievementsScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path={routes.shop}
            element={
              <ProtectedRoute>
                <ShopScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path={routes.water}
            element={
              <ProtectedRoute>
                <WaterScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path={routes.sleep}
            element={
              <ProtectedRoute>
                <SleepScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path={routes.meditation}
            element={
              <ProtectedRoute>
                <MeditationScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path={routes.meals}
            element={
              <ProtectedRoute>
                <MealsScreen />
              </ProtectedRoute>
            }
          />
          <Route path={routes.createPet} element={<PetCreationScreen />} />
          <Route path={routes.onboarding} element={<StartScreen />} />
          <Route path="*" element={<div>Not found</div>} />
        </Route>
      </Routes>
    </AppProvider>
  )
}
