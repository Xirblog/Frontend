import { createBrowserRouter } from 'react-router-dom'
import { PostsPage } from '@pages/posts'
import { LoginPage } from '@pages/auth/ui/loginPage.tsx'
import { RegisterPage } from '@pages/auth'
import { ProtectedRoute } from './providers/ProtectedRoute'
import { PublicOnlyRoute } from './providers/PublicOnlyRoute.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <PostsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/login',
    element: (
      <PublicOnlyRoute>
        <LoginPage />
      </PublicOnlyRoute>
    ),
  },
  {
    path: '/register',
    element: (
      <PublicOnlyRoute>
        <RegisterPage />
      </PublicOnlyRoute>
    ),
  },
])

export default router
