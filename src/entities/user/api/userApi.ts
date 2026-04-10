import { apiClient } from '@shared/api/apiClient.ts'
import type { User } from '@entities/user'

export function getCurrentUser() {
  return apiClient.get<User>(`/users/me`)
}
