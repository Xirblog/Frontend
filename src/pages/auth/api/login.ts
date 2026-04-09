import { apiClient } from '@shared/api/apiClient.ts'

export interface LoginRequest {
  username: string
  password: string
}

export function login(request: LoginRequest) {
  return apiClient.post('/auth/login', request)
}
