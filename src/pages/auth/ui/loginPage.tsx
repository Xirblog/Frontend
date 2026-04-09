import { Navbar } from '@widgets/navbar'
import { login, type LoginRequest } from '@pages/auth/api/login.ts'
import { useState } from 'react'
import type { SubmitEvent } from 'react'
import { useAuth } from '@app/providers/useAuth.ts'
import { useNavigate } from 'react-router-dom'

export function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { login: authLogin } = useAuth()
  const navigate = useNavigate()

  function getStringField(formData: FormData, fieldName: string): string {
    const value = formData.get(fieldName)
    return typeof value === 'string' ? value : ''
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData(event.currentTarget)

      const request: LoginRequest = {
        username: getStringField(formData, 'username'),
        password: getStringField(formData, 'password'),
      }

      const response = await login(request)

      const { access_token, refresh_token } = response.data as {
        access_token: string
        refresh_token: string
      }

      authLogin(access_token, refresh_token)
      void navigate('/', { replace: true })

      console.log('Successfully logged in.')
    } catch (error) {
      console.error('Failed to login in: ', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Navbar />

      <main>
        <form
          onSubmit={(event) => {
            void handleSubmit(event)
          }}
        >
          <input type="text" name="username" placeholder="Username" required />
          <input type="password" name="password" placeholder="Password" required />
          <button type="submit" disabled={isLoading}>
            Login
          </button>
        </form>
      </main>
    </>
  )
}
