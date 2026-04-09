import { useState, type ReactNode } from 'react'
import { AuthContext } from './AuthContext'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(() =>
    localStorage.getItem('access_token'),
  )
  const [refreshToken, setRefreshToken] = useState<string | null>(() =>
    localStorage.getItem('refresh_token'),
  )

  const login = (access: string, refresh: string) => {
    setAccessToken(access)
    setRefreshToken(refresh)
    localStorage.setItem('access_token', access)
    localStorage.setItem('refresh_token', refresh)
  }

  const logout = () => {
    setAccessToken(null)
    setRefreshToken(null)
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
  }

  return (
    <AuthContext
      value={{
        accessToken,
        refreshToken,
        isAuthenticated: !!accessToken,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext>
  )
}
