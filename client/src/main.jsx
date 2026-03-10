import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { QuizProvider } from './features/quizzes/quiz.context.jsx'
import { ResponsiveProvider } from './logic/HandleResize.jsx'
import App from './App.jsx'
import '@/assets/index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <QuizProvider>
        <ResponsiveProvider>
          <App />
        </ResponsiveProvider>
      </QuizProvider>
    </BrowserRouter>
  </StrictMode>,
)
