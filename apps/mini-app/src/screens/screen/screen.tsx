import * as React from 'react'
import { cn } from '@tamagotchi/utils'
import { Toaster } from 'react-hot-toast'

import type { NavbarProps } from '@/shared'
import type {
  BackgroundTextureProps,
  ResourcesPanelProps,
} from '@/modules'

import { Navbar } from '@/shared'
import {
  BackgroundTexture,
  GemsWidget,
  ResourcesPanel,
  ResourcesWidget,
} from '@/modules'

interface ScreenProps extends React.ComponentProps<'div'> {
  texture?: BackgroundTextureProps['variant']
}

function withNavbar<P extends ScreenProps>(Component: React.ComponentType<P>) {
  return ({ isVisible, ...props }: P & NavbarProps) => {
    return (
      <>
        <Navbar isVisible={isVisible} />
        <Component {...(props as P)} />
        <GemsWidget />
      </>
    )
  }
}

function withResources<P extends ScreenProps>(Component: React.ComponentType<P>) {
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

function withResourcesPanel<
  P extends ScreenProps & { panel: ResourcesPanelProps },
>(Component: React.ComponentType<P>) {
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
        className,
      )}
    >
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
