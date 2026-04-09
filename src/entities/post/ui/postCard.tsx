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
      <Link
        to={`/post/${post.postId}`}
        style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
      >
        <h3 style={{ margin: 0, color: 'var(--primary-color)' }}>{post.name}</h3>
        <span style={{ color: 'var(--text-color)', opacity: 0.8 }}>{post.description}</span>
      </Link>
      {actions && <div style={{ marginTop: '1rem' }}>{actions}</div>}
    </div>
  )
}
