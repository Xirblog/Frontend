import { useState, type ReactNode } from 'react'
import { AuthContext } from './AuthContext'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('is_authenticated') === 'true'
  })

  const login = () => {
    setIsAuthenticated(true)
    localStorage.setItem('is_authenticated', 'true')
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('is_authenticated')
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
  }

  return (
    <AuthContext
      value={{
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext>
  )
}
