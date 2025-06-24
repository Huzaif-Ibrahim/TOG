import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ContextState from './context/Context.jsx'
import { Analytics } from "@vercel/analytics/react"

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ContextState>
      <App />
      <Analytics />
    </ContextState>
  </BrowserRouter>
)
