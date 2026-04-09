import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { Post } from '../model/post.ts'

interface PostCardProps {
  post: Post
  actions?: ReactNode
}

export function PostCard({ post, actions }: PostCardProps) {
  return (
    <div className="post-card">
      <Link to={`/post/${post.postId}`}>
        <span>{post.name}</span>
        <span>{post.description}</span>
      </Link>
      {actions}
    </div>
  )
}
