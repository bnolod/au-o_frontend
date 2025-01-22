import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import { LanguageProvider } from './contexts/LanguageContext.tsx'
import LandingPage from './pages/LandingPage.tsx'
import { AuthenticationProvider } from './contexts/AuthenticationContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
 <AuthenticationProvider>

    <BrowserRouter>
      <Routes>
        <Route index element={<LandingPage/>}>

        </Route>
      </Routes>
    </BrowserRouter>
 </AuthenticationProvider>
    </LanguageProvider>
  </StrictMode>,
)
