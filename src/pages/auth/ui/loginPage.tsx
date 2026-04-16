import { Navbar } from '@widgets/navbar'
import { login, type LoginRequest } from '@pages/auth/api/login.ts'
import { useState } from 'react'
import type { SubmitEvent } from 'react'
import { useAuth } from '@app/providers/useAuth.ts'
import { useNavigate } from 'react-router-dom'
import { Button } from '@shared/ui/button'
import { isAxiosError } from 'axios'

export function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const { login: authLogin } = useAuth()
  const navigate = useNavigate()

  function getStringField(formData: FormData, fieldName: string): string {
    const value = formData.get(fieldName)
    return typeof value === 'string' ? value : ''
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setErrorMsg(null)

    try {
      const formData = new FormData(event.currentTarget)

      const request: LoginRequest = {
        username: getStringField(formData, 'username'),
        password: getStringField(formData, 'password'),
      }

      const response = await login(request)

      if (response.status >= 200 && response.status < 300) {
        authLogin()
        void navigate('/', { replace: true })
      }

      console.log('Successfully logged in.')
    } catch (error) {
      console.error('Failed to login in: ', error)

      if (!isAxiosError(error)) {
        return
      }

      switch (error.status) {
        case 404:
          setErrorMsg('Account not found')
          break
        case 401:
          setErrorMsg('Invalid email or password')
          break
        default: {
          const err = error as { response?: { data?: { message?: string } }; message?: string }
          setErrorMsg(err.response?.data?.message ?? err.message ?? 'Failed to login')
        }
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Navbar />

      <main style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
        <form
          style={{ width: '20%', minWidth: '300px', display: 'flex', flexDirection: 'column' }}
          onSubmit={(event) => {
            void handleSubmit(event)
          }}
        >
          <h2 style={{ textAlign: 'center', marginBottom: '2rem', marginTop: 0 }}>Login</h2>
          <input type="text" name="username" placeholder="Username" required />
          <input type="password" name="password" placeholder="Password" required />
          {errorMsg && (
            <div style={{ color: '#ff4d4f', marginBottom: '1rem', textAlign: 'center' }}>
              {errorMsg}
            </div>
          )}
          <Button type="submit" disabled={isLoading}>
            Login
          </Button>
        </form>
      </main>
    </>
  )
}
