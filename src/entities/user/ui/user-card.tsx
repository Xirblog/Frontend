import type { ReactNode } from 'react'
import type { User } from '../model/user'

interface UserCardProps {
  user: User
  actions?: ReactNode
}

export function UserCard({ user, actions }: UserCardProps) {
  return (
    <div className="user-card">
      <span>{user.name}</span>
      <span>{user.email}</span>
      {actions}
    </div>
  )
}
