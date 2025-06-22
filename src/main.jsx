import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ContextState from './context/Context.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ContextState>
      <App />
    </ContextState>
  </BrowserRouter>
)
