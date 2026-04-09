import { ThemeToggle } from '@features/toggle-theme'
import { APP_NAME } from '@shared/config/routes'
import { Button } from '@shared/ui/button'
import { Link } from 'react-router-dom'
import { useAuth } from '@app/providers/useAuth.ts'

export function Navbar() {
  const { isAuthenticated, logout } = useAuth()

  return (
    <header className="header">
      <Link to="/">
        <span className="header-title">{APP_NAME}</span>
      </Link>

      <div>
        {!isAuthenticated ? (
          <>
            <Link to="/login">
              <Button>Login</Button>
            </Link>
            <Link to="/register">
              <Button>Register</Button>
            </Link>
          </>
        ) : (
          <Button onClick={logout}>Logout</Button>
        )}

        <ThemeToggle />
      </div>
    </header>
  )
}
