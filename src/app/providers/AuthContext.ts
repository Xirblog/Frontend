import { createContext } from 'react'

export interface AuthContextType {
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  login: (access: string, refresh: string) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
