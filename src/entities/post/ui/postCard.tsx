import type { ReactNode } from 'react'
import type { Post } from '../model/post.ts'

interface PostCardProps {
  post: Post
  actions?: ReactNode
}

export function PostCard({ post, actions }: PostCardProps) {
  return (
    <div className="post-card">
      <span>{post.name}</span>
      <span>{post.description}</span>
      {actions}
    </div>
  )
}
