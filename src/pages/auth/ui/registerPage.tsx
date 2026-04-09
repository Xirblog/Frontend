import { Navbar } from '@widgets/navbar'
import { register, type RegisterRequest } from '@pages/auth/api/register.ts'
import { useAuth } from '@app/providers/useAuth'
import { useState } from 'react'
import type { SubmitEvent } from 'react'

export function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()

  function getStringField(formData: FormData, fieldName: string): string {
    const value = formData.get(fieldName)
    return typeof value === 'string' ? value : ''
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData(event.currentTarget)

      const request: RegisterRequest = {
        username: getStringField(formData, 'username'),
        firstName: getStringField(formData, 'firstName'),
        lastName: getStringField(formData, 'lastName'),
        password: getStringField(formData, 'password'),
        age: Number(getStringField(formData, 'age')),
      }

      const response = await register(request)

      const { access_token, refresh_token } = response.data as {
        access_token: string
        refresh_token: string
      }

      login(access_token, refresh_token)

      console.log('Successfully registered')
    } catch (error) {
      console.error('Failed to register: ', error)
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
          <input type="text" name="firstName" placeholder="First Name" required />
          <input type="text" name="lastName" placeholder="Last Name" required />
          <input type="password" name="password" placeholder="Password" required />
          <input type="number" name="age" placeholder="18" required />
          <button type="submit" disabled={isLoading}>
            Register
          </button>
        </form>
      </main>
    </>
  )
}
