import { AuthProvider } from '@/shared'
import * as React from 'react'

export const ProtectedRoute: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <AuthProvider>{children}</AuthProvider>
}
