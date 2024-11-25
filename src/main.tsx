import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'

import AppRoutes from 'routes/AppRoutes'

// contexts
import { AuthProvider } from 'contexts/AuthProvider'
import QueryProvider from 'contexts/QueryProvider'
import { SidebarProvider } from 'contexts/SidebarProvider'

const isDev = import.meta.env.DEV
// const isDev = false

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryProvider>
        <AuthProvider isDev={isDev}>
          <SidebarProvider>
            <AppRoutes />
          </SidebarProvider>
        </AuthProvider>
      </QueryProvider>
    </BrowserRouter>
  </StrictMode>
)
