import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/reset.css'
import './css/index.css'
import App from './components/app/App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
