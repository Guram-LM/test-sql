import { createRoot } from 'react-dom/client'
import './index.css'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n.ts'
import { BrowserRouter } from 'react-router-dom'
import AppErrorBoundary from './coaching-app/pages/error/AppErrorBoundary.tsx'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './coaching-app/providers/index.tsx'
import AppBootstrap from './AppBootstrap.tsx'
import App from './App.tsx'

 

// main.tsx
createRoot(document.getElementById("root")!).render(
  <I18nextProvider i18n={i18n}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppErrorBoundary>
          <AppBootstrap>
            <App />
          </AppBootstrap>
        </AppErrorBoundary>
      </BrowserRouter>
    </QueryClientProvider>
  </I18nextProvider>
);