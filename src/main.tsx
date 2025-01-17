import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import { LanguageProvider } from './contexts/LanguageContext.tsx'
import LandingPage from './pages/LandingPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>

    <BrowserRouter>
      <Routes>
        <Route index element={<LandingPage/>}>

        </Route>
      </Routes>
    </BrowserRouter>
    </LanguageProvider>
  </StrictMode>,
)
