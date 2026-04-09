import { apiClient } from '@shared/api/apiClient.ts'
import type { Post } from '../model/post.ts'

export function fetchPosts() {
  return apiClient.get<Post[]>('/posts')
}

// export function fetchPostById(postId: string) {
//   return apiClient.get<Post>(`/users/${postId}`)
// }
