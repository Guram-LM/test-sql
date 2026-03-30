import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Suspense } from 'react'
import BootLoader from './adminApp/pages/adminLoader/BootLoader.tsx'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './adminApp/services/queryClient.ts'





createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <Suspense fallback={<BootLoader/>}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Suspense>
  </QueryClientProvider>
)