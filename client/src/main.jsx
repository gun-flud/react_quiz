import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { ResponsiveProvider } from './utils/HandleResize.jsx'
import App from './App.jsx'
import '@/assets/index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <ResponsiveProvider>
          <App />
        </ResponsiveProvider>
    </BrowserRouter>
  </StrictMode>,
)
