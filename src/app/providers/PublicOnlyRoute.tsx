import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './useAuth'
import type { ReactNode } from 'react'

export function PublicOnlyRoute({ children }: { children?: ReactNode }) {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return children ? <>{children}</> : <Outlet />
}
