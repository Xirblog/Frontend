import { apiClient } from '@shared/api/api-client'
import type { User } from '../model/user'

export function fetchUsers() {
  return apiClient.get<User[]>('/users')
}

export function fetchUserById(id: string) {
  return apiClient.get<User>(`/users/${id}`)
}
