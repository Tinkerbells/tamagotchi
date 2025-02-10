import {
  BackgroundTexture,
  BackgroundTextureProps,
  GemsWidget,
  ResourcesPanel,
  ResourcesPanelProps,
  ResourcesWidget,
} from '@/modules'
import { Navbar } from '@/shared'
import { cn } from '@tamagotchi/utils'
import * as React from 'react'
import { Toaster } from 'react-hot-toast'
import { ShadowLeft, ShadowRight } from './shadows'

interface ScreenProps extends React.ComponentProps<'div'> {
  texture?: BackgroundTextureProps['variant']
}

const withNavbar = <P extends ScreenProps>(
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

const withResources = <P extends ScreenProps>(
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

const withResourcesPanel = <
  P extends ScreenProps & { panel: ResourcesPanelProps },
>(
  Component: React.ComponentType<P>
) => {
  return (props: P) => {
    return (
      <>
        <Component {...props} />
        <GemsWidget />
        <ResourcesPanel {...props.panel} />
      </>
    )
  }
}

export const Screen: React.FC<ScreenProps> = ({
  children,
  texture,
  className,
}) => {
  return (
    <main
      className={cn(
        'bg-background-primary flex h-screen w-full flex-col items-center overflow-x-hidden overflow-y-scroll px-4 bg-blend-multiply',
        className
      )}
    >
      <ShadowLeft />
      <ShadowRight />
      <Toaster position="top-center" reverseOrder={false} />
      <BackgroundTexture variant={texture} />
      {children}
    </main>
  )
}

export const WithNavbarScreen = withNavbar(Screen)
export const WithResourcesScreen = withResources(Screen)
export const WithResourcesPanel = withResourcesPanel(Screen)
export const WithNavbarAndResourcesScreen = withResources(withNavbar(Screen))
