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
    document.cookie = 'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    document.cookie = 'refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
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
