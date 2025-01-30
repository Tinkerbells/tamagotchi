export const routes = {
  createPet: '/create-pet',
  home: '/',
  onboarding: '/onboarding',
  achievements: '/achievements',
  profile: '/profile',
  shop: '/shop',
  water: '/water',
} as const

export type RoutesType = (typeof routes)[keyof typeof routes]
