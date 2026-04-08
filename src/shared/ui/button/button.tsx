import type { ReactNode } from 'react'
import { cn } from '@shared/lib/utils'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}

export function Button({ children, onClick, variant = 'primary', disabled = false }: ButtonProps) {
  return (
    <button
      type="button"
      className={cn('btn', `btn-${variant}`)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
