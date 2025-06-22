import { createRoot } from 'react-dom/client'
import "./shared/styles/globals.css"
import AppProviders from './providers/AppProvider'
import { AppRouter } from './providers/router/AppRouter'
createRoot(document.getElementById('root')!).render(
  <AppProviders>
    <AppRouter />
  </AppProviders>
)
