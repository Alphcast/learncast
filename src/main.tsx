import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import './index.css'
import App from './App.tsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

function renderApp() {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <App />
      </ClerkProvider>
    </StrictMode>,
  )
}

if (!PUBLISHABLE_KEY) {
  const root = document.getElementById('root')!
  root.innerHTML = `
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;font-family:sans-serif;padding:20px;text-align:center;">
      <h1 style="color:#EF5350;font-size:1.5rem;margin-bottom:8px;">Configuration Error</h1>
      <p style="color:#64748B;font-size:0.95rem;max-width:400px;">Missing VITE_CLERK_PUBLISHABLE_KEY environment variable. Please set it in your Vercel project settings and redeploy.</p>
    </div>
  `
} else {
  renderApp()
}
