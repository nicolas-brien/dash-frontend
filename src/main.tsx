import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { AuthProvider } from 'context/AuthContext.tsx'
import { ToastProvider } from 'components/toast/ToastProvider.tsx'

import App from './App.tsx'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </AuthProvider>
  </StrictMode>
)
