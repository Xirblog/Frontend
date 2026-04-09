import { Navbar } from '@widgets/navbar'
import { register, type RegisterRequest } from '@pages/auth/api/register.ts'
import { useAuth } from '@app/providers/useAuth'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import type { SubmitEvent } from 'react'
import { Button } from '@shared/ui/button'

export function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
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

      const request: RegisterRequest = {
        username: getStringField(formData, 'username'),
        firstName: getStringField(formData, 'firstName'),
        lastName: getStringField(formData, 'lastName'),
        password: getStringField(formData, 'password'),
        age: Number(getStringField(formData, 'age')),
      }

      const response = await register(request)

      if (response.status >= 200 && response.status < 300) {
        login()
        void navigate('/', { replace: true })
      } else {
        void navigate('/login', { replace: true })
      }

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

      <main style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
        <form
          style={{ width: '20%', minWidth: '300px', display: 'flex', flexDirection: 'column' }}
          onSubmit={(event) => {
            void handleSubmit(event)
          }}
        >
          <h2 style={{ textAlign: 'center', marginBottom: '2rem', marginTop: 0 }}>Register</h2>
          <input type="text" name="username" placeholder="Username" required />
          <input type="text" name="firstName" placeholder="First Name" required />
          <input type="text" name="lastName" placeholder="Last Name" required />
          <input type="password" name="password" placeholder="Password" required />
          <input type="number" name="age" placeholder="Age" min="1" max="100" required />
          <Button type="submit" disabled={isLoading}>
            Register
          </Button>
        </form>
      </main>
    </>
  )
}
