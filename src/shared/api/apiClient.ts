import axios from 'axios'
import { API_BASE_URL } from '@shared/config/env'

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

apiClient.interceptors.request.use((config) => {
  return config
})
