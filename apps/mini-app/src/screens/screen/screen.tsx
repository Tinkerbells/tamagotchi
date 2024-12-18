import { GemsWidget, ResourcesWidget } from '@/modules'
import { Navbar } from '@/shared'
import * as React from 'react'

export const withNavbar = <P extends object>(
  Component: React.ComponentType<P>
) => {
  return (props: P) => {
    return (
      <>
        <Navbar />
        <Component {...props} />
        <GemsWidget />
      </>
    )
  }
}

export const withResources = <P extends object>(
  Component: React.ComponentType<P>
) => {
  return (props: P) => {
    return (
      <>
        <Component {...props} />
        <GemsWidget />
        <ResourcesWidget />
      </>
    )
  }
}

export const Screen: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <main className="bg-main relative flex h-screen w-full flex-col items-center overflow-scroll px-4 bg-blend-multiply">
      {children}
    </main>
  )
}

export const WithNavbarScreen = withNavbar(Screen)
export const WithResourcesScreen = withResources(Screen)
export const WithNavbarAndResourcesScreen = withResources(withNavbar(Screen))
