import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'

import AppRoutes from 'routes/AppRoutes'

// contexts
import { QueryProvider } from 'contexts/QueryProvider'
import { StorageProvider } from 'contexts/StorageProvider'
import { SidebarProvider } from 'contexts/SidebarProvider'
import { FeatureFlagsProvider } from 'contexts/FeatureFlagsProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FeatureFlagsProvider>
      <BrowserRouter>
        <QueryProvider>
          <StorageProvider>
            <SidebarProvider>
              <AppRoutes />
            </SidebarProvider>
          </StorageProvider>
        </QueryProvider>
      </BrowserRouter>
    </FeatureFlagsProvider>
  </StrictMode>
)
