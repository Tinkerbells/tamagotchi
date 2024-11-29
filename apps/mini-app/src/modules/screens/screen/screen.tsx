import { ShadowRight, ShadowLeft } from './shadows'
import * as React from 'react'

export const Screen: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <section className="bg-main relative flex h-screen w-full flex-col items-center overflow-hidden px-4 bg-blend-multiply">
      <ShadowRight />
      <ShadowLeft />
      {children}
    </section>
  )
}
