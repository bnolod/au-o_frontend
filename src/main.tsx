import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { LanguageProvider } from "./contexts/LanguageContext.tsx";
import { AuthenticationProvider } from "./contexts/AuthenticationContext.tsx";
import { CommentProvider } from "./contexts/CommentContext.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LanguageProvider>
      <AuthenticationProvider>
        <CommentProvider>
          <App />
        </CommentProvider>
      </AuthenticationProvider>
    </LanguageProvider>
  </StrictMode>
);
