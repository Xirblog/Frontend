import { Button } from '@shared/ui/button'
import { useTheme } from '../model/use-theme'

export function ThemeToggle() {
  const [theme, toggle] = useTheme()

  return (
    <Button variant="secondary" onClick={toggle}>
      {theme === 'light' ? 'Dark' : 'Light'}
    </Button>
  )
}
