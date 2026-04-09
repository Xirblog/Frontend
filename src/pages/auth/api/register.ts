import { apiClient } from '@shared/api/apiClient.ts'

export interface RegisterRequest {
  username: string
  password: string
  firstName: string
  lastName: string
  age: number
}

export function register(request: RegisterRequest) {
  return apiClient.post('/auth/register', request)
}
