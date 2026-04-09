import { useTheme } from '../model/useTheme.ts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'

export function ThemeToggle() {
  const [theme, toggle] = useTheme()

  return (
    <button
      onClick={toggle}
      style={{
        background: 'none',
        border: 'none',
        color: 'var(--primary-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '36px',
        height: '36px',
        padding: 0,
        fontSize: '1.2rem',
        cursor: 'pointer',
        transition: 'transform 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)'
      }}
      aria-label="Toggle Theme"
    >
      <FontAwesomeIcon icon={theme === 'light' ? faMoon : faSun} />
    </button>
  )
}
