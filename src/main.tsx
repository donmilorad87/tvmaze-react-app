import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { registerSW } from "virtual:pwa-register";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import App from './App.tsx'
const queryClient = new QueryClient()

// add this to prompt for a refresh
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("New content available. Reload?")) {
      updateSW(true);
    }
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
