import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { LanguageProvider } from './contexts/LanguageContext.tsx';
import { AuthenticationProvider } from './contexts/AuthenticationContext.tsx';
import { CommentProvider } from './contexts/CommentContext.tsx';
import App from './App.tsx';
import { SnackbarProvider } from './contexts/SnackbarContext.tsx';
import { WebSocketProvider } from './contexts/WebSocketContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <AuthenticationProvider>
        <CommentProvider>
          <SnackbarProvider>
            <WebSocketProvider>
              <App />
            </WebSocketProvider>
          </SnackbarProvider>
        </CommentProvider>
      </AuthenticationProvider>
    </LanguageProvider>
  </StrictMode>
);
