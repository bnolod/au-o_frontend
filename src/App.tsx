import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import LandingPage from "./pages/LandingPage.tsx";

import LoginPage from "./pages/LoginPage.tsx";
import MainPage from "./pages/MainPage.tsx";
import { useAuthentication } from "./contexts/AuthenticationContext.tsx";
import { useEffect } from "react";

function App() {
  const { user } = useAuthentication();

  useEffect(() => {
    if (user != undefined) {
      console.log(user.email);
    } else {
      console.log("no user");
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        {user === undefined && (
          <>
            <Route index element={<LandingPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
        {user !== null && user !== undefined && (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route index element={<MainPage />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
