import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Providers } from './providers/providers'
import { HomePage } from '@pages/home'
import './styles/globals.css'

const root = document.getElementById('root')
if (!root) throw new Error('Root element not found')

createRoot(root).render(
  <StrictMode>
    <Providers>
      <HomePage />
    </Providers>
  </StrictMode>,
)
