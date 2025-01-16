import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Landing from './Landing/Landing.tsx'
import { LanguageProvider } from './contexts/LanguageContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>

    <BrowserRouter>
      <Routes>
        <Route index element={<Landing/>}>

        </Route>
      </Routes>
    </BrowserRouter>
    </LanguageProvider>
  </StrictMode>,
)
