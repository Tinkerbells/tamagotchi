import {
  createHashRouter,
  createPanel,
  createRoot,
  createView,
  RoutesConfig,
} from '@vkontakte/vk-mini-apps-router'

export const DEFAULT_ROOT = 'default_root'

export const DEFAULT_VIEW = 'default_view'

export const DEFAULT_VIEW_PANELS = {
  HOME: 'home',
  ONBOARDING: 'onboarding',
  PET_CREATION: 'pet-creation',
} as const

export const routes = RoutesConfig.create([
  createRoot(DEFAULT_ROOT, [
    createView(DEFAULT_VIEW, [
      createPanel(DEFAULT_VIEW_PANELS.HOME, '/', []),
      createPanel(
        DEFAULT_VIEW_PANELS.ONBOARDING,
        `/${DEFAULT_VIEW_PANELS.ONBOARDING}`,
        []
      ),
      createPanel(
        DEFAULT_VIEW_PANELS.PET_CREATION,
        `/${DEFAULT_VIEW_PANELS.PET_CREATION}`,
        []
      ),
    ]),
  ]),
])

export const router = createHashRouter(routes.getRoutes())
