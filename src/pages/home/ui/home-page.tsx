import { Header } from '@widgets/header'
import { Button } from '@shared/ui/button'

export function HomePage() {
  return (
    <>
      <Header />
      <main>
        <h1>Home</h1>
        <p>Welcome to the app.</p>
        <Button>Get started</Button>
      </main>
    </>
  )
}
