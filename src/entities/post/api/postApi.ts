import { apiClient } from '@shared/api/apiClient.ts'
import type { Post } from '../model/post.ts'

export interface CreatePostRequest {
  name: string
  description: string
  markdownContent: string
}

export function createPost(request: CreatePostRequest) {
  return apiClient.post<string>('/posts', request)
}

export function fetchPosts() {
  return apiClient.get<Post[]>('/posts')
}

// export function fetchPostById(postId: string) {
//   return apiClient.get<Post>(`/users/${postId}`)
// }
