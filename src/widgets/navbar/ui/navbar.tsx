import { ThemeToggle } from '@features/toggleTheme'
import { APP_NAME } from '@shared/config/env.ts'
import { Button } from '@shared/ui/button'
import { Link } from 'react-router-dom'
import { useAuth } from '@app/providers/useAuth.ts'
import { useState } from 'react'

export function Navbar() {
  const { isAuthenticated, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="header">
      <div className="header-top">
        <Link to="/">
          <span className="header-title" style={{ color: 'var(--primary-color)' }}>
            {APP_NAME}
          </span>
        </Link>
        <button
          className="mobile-menu-btn"
          onClick={() => {
            setIsMobileMenuOpen(!isMobileMenuOpen)
          }}
          aria-label="Toggle Menu"
        >
          ☰
        </button>
      </div>

      <div className={`navbar-links ${isMobileMenuOpen ? 'open' : ''}`}>
        <Link to="/">
          <Button variant="text">Posts</Button>
        </Link>

        {!isAuthenticated ? (
          <>
            <Link to="/login">
              <Button variant="text">Login</Button>
            </Link>
            <Link to="/register">
              <Button variant="text">Register</Button>
            </Link>
          </>
        ) : (
          <Button variant="text" onClick={logout}>
            Logout
          </Button>
        )}

        <ThemeToggle />
      </div>
    </header>
  )
}
