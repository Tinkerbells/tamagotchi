import * as React from 'react'

import { AuthProvider } from '@/shared'

export const ProtectedRoute: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <AuthProvider>{children}</AuthProvider>
}
