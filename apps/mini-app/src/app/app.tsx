import { Route, Routes } from 'react-router-dom'

import { AchievementsScreen } from '@/screens/achievements-screen'
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
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={(
              <ProtectedRoute>
                <HomeScreen />
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
                <AchievementsScreen />
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
                <WaterScreen />
              </ProtectedRoute>
            )}
          />
          <Route
            path={routes.sleep}
            element={(
              <ProtectedRoute>
                <SleepScreen />
              </ProtectedRoute>
            )}
          />
          <Route
            path={routes.meditation}
            element={(
              <ProtectedRoute>
                <MeditationScreen />
              </ProtectedRoute>
            )}
          />
          <Route
            path={routes.meals}
            element={(
              <ProtectedRoute>
                <MealsScreen />
              </ProtectedRoute>
            )}
          />
          <Route
            path={routes.gratitude}
            element={(
              <ProtectedRoute>
                <GratitudeScreen />
              </ProtectedRoute>
            )}
          />
          {/* <Route */}
          {/*   path={routes.walking} */}
          {/*   element={( */}
          {/*     <ProtectedRoute> */}
          {/*       <WalkingScreen /> */}
          {/*     </ProtectedRoute> */}
          {/*   )} */}
          {/* /> */}
          <Route path={routes.createPet} element={<PetCreationScreen />} />
          <Route path={routes.onboarding} element={<StartScreen />} />
          <Route path="*" element={<div>Not found</div>} />
        </Route>
      </Routes>
    </AppProvider>
  )
}
