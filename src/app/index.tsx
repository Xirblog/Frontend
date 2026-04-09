import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HomePage } from '@pages/home'
import './styles/globals.css'
import { BrowserRouter } from 'react-router-dom'

const root = document.getElementById('root')

if (!root) {
  throw new Error('Root element not found')
}

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  </StrictMode>,
)
