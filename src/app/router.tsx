import { createBrowserRouter } from 'react-router-dom'
import { PostsPage, PostPage } from '@pages/posts'
import { LoginPage } from '@pages/auth/ui/loginPage.tsx'
import { RegisterPage } from '@pages/auth'
import { PublicOnlyRoute } from './providers/PublicOnlyRoute.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <PostsPage />,
  },
  {
    path: '/post/:id',
    element: <PostPage />,
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
