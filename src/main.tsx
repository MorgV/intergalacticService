import { createRoot } from 'react-dom/client'
import { AppRouter } from './app/router/AppRouter.tsx'
import AppProviders from './app/providers/AppProvider.tsx'
import "./shared/styles/globals.css"
createRoot(document.getElementById('root')!).render(
  <AppProviders>
    <AppRouter />
  </AppProviders>
)
