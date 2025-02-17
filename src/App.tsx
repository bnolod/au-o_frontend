import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import LandingPage from "./pages/LandingPage.tsx";

import LoginPage from "./pages/LoginPage.tsx";
import MainPage from "./pages/MainPage.tsx";
import { useAuthentication } from "./contexts/AuthenticationContext.tsx";
import { useEffect } from "react";
import ProtectedRoute from "./lib/ProtectedRoute.tsx";
import GeneralLayout from "./pages/GeneralLayout.tsx";

function App() {
  const { user } = useAuthentication();

  useEffect(() => {
    console.log(user);
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/" element={<GeneralLayout />}>
            <Route index element={<MainPage />} />
          </Route>
          <Route path="/layout" element={<GeneralLayout />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
