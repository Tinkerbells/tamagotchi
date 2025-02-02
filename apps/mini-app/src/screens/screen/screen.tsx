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

interface ScreenProps extends React.PropsWithChildren {
  texture?: BackgroundTextureProps['variant']
  background?: ResourcesPanelProps['variant']
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
  background,
}) => {
  const bgColor = `bg-[${background}]`
  return (
    <main
      className={cn(
        'bg-background-primary relative flex h-screen w-full flex-col items-center overflow-x-hidden overflow-y-scroll px-4 bg-blend-multiply',
        bgColor
      )}
    >
      <BackgroundTexture variant={texture} />
      {children}
    </main>
  )
}

export const WithNavbarScreen = withNavbar(Screen)
export const WithResourcesScreen = withResources(Screen)
export const WithResourcesPanel = withResourcesPanel(Screen)
export const WithNavbarAndResourcesScreen = withResources(withNavbar(Screen))
