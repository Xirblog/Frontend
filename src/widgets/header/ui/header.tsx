import { ThemeToggle } from '@features/toggle-theme'
import { APP_NAME } from '@shared/config/routes'

export function Header() {
  return (
    <header className="header">
      <span className="header-title">{APP_NAME}</span>
      <ThemeToggle />
    </header>
  )
}
