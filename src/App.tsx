import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import LandingPage from "./pages/LandingPage.tsx";

import LoginPage from "./pages/LoginPage.tsx";
import MainPage from "./pages/MainPage.tsx";
import { useAuthentication } from "./contexts/AuthenticationContext.tsx";
import { useEffect } from "react";
import ProtectedRoute from "./lib/ProtectedRoute.tsx";
import GeneralLayout from "./pages/GeneralLayout.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import NewPost from "./pages/NewPost.tsx";

function App() {
  const { user } = useAuthentication();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/" element={<GeneralLayout />}>
            <Route index element={<MainPage />} />
            <Route path="/profile/">
              <Route index element={<ProfilePage userId={user?.id} />} />
              <Route path=":id" element={<ProfilePage userId={user?.id} />} />
            </Route>
            <Route path="/post">
              <Route index element={<NewPost />} />
              <Route path=":id" element={<GeneralLayout />} />
            </Route>
          </Route>

          <Route path="/layout" element={<GeneralLayout />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
