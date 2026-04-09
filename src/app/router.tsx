import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from '@pages/home'

const router = createBrowserRouter([
  {
    path: '/',
    Component: HomePage,
  },
])

export default router
