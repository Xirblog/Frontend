import type { ReactNode } from 'react'
import { cn } from '@shared/lib/utils'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'text'
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  className?: string
  style?: React.CSSProperties
  'aria-label'?: string
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  type = 'button',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn('btn', variant !== 'primary' ? `btn-${variant}` : '', className)}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
