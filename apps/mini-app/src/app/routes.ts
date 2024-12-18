export const routes = {
  createPet: '/create-pet',
  home: '/',
  onboarding: '/onboarding',
  achievements: '/achievements',
  profile: '/profile',
  shop: '/shop',
} as const

export type RoutesType = (typeof routes)[keyof typeof routes]
