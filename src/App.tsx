import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router";
import LandingPage from "./pages/LandingPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
//import MainPage from "./pages/MainPage.tsx";
import { useAuthentication } from "./contexts/AuthenticationContext.tsx";
import ProtectedRoute from "./lib/ProtectedRoute.tsx";
import GeneralLayout from "./pages/GeneralLayout.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import NewPost from "./pages/NewPost.tsx";
import GroupFeed from "./pages/GroupFeed.tsx";
import MessagesPage from "./pages/MessagesPage.tsx";
import GroupPage from "./pages/GroupPage.tsx";
import NewGroupPost from "./components/social/tabs/NewGroupPost.tsx";
import PostsFeed from "./pages/Feed.tsx";
import EventsPage from "./pages/EventsPage.tsx";

function App() {
  const { user } = useAuthentication();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/login" element={<LoginPage />} />{/*deprecated*/}
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/" element={<GeneralLayout />}>
            <Route index element={<PostsFeed />} />
            <Route path="/profile/">
              { user && <Route index element={<Navigate to={`/profile/${user!.id}`}/>} />}
              <Route path=":id" element={<ProfilePage/>} />
            </Route>
              
            <Route path="/post">
              <Route index element={<NewPost />} />
              <Route path=":id" element={<GeneralLayout />} />
            </Route>
            <Route path="/groups">
              <Route index element={<GroupFeed />} />
              <Route path=":id" element={<GroupPage />} />
              <Route path=":id/post/create" element={<NewGroupPost/>}/>
            </Route>
            <Route path="/events" element={<EventsPage/>}/>
          </Route>
          <Route path="/messages">
            <Route index element={<MessagesPage/>}/>
            <Route path=":id" element={<MessagesPage/>}/>
          </Route>
          <Route path="/layout" element={<GeneralLayout />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
