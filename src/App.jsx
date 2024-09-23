import React from "react";

import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import Sidebar from "./Components/Sidebar";
import AudioPlayer from "./Components/AudioPlayer";
import Navbar from "./Components/Navbar";
import Main from "./Pages/Main";
import Home from "./Pages/Home";
import LikedSongs from "./Pages/LikedSongs";
import Library from "./Pages/Library";
import Search from "./Pages/Search";
import Playlist from "./Pages/Playlist";
import Profile from "./Pages/Profile";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import NotFound from "./Pages/NotFound";

import RoutesPage from "./Components/Routes/RoutesPage";

import PrivateRoute from "./PrivateRoute";
function App() {
  const [user, setUser] = useState("");
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setUser(true);
    }
  }, []);

  return (
    <>
      <>
        {/* <RoutesPage /> */}
        {/* <Navbar /> */}
        {/* <Sidebar /> */}
        {/* <AudioPlayer /> */}
        {/* <Main /> */}
        {/* <Home /> */}
        {/* <LikedSongs /> */}
        {/* <Library/> */}
        {/* <Search/> */}
        {/* <Playlist /> */}
        {/* <Profile /> */}
        {/* <SignUp /> */}
        {/* <Login /> */}
        {/* <NotFound /> */}
      </>

      <Fragment>
        {user &&
          location.pathname !== "/login" &&
          location.pathname !== "/" &&
          location.pathname !== "/signup" &&
          location.pathname !== "/not-found" && (
            <Fragment>
              <Navbar />
              <Sidebar />
              <AudioPlayer />
            </Fragment>
          )}

        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/home"
            element={<PrivateRoute user={user} element={<Home />} />}
          />
          <Route
            path="/collection/tracks"
            element={<PrivateRoute user={user} element={<LikedSongs />} />}
          />
          <Route
            path="/collection/playlists"
            element={<PrivateRoute user={user} element={<Library />} />}
          />
          <Route
            path="/search"
            element={<PrivateRoute user={user} element={<Search />} />}
          />
          <Route
            path="/playlist/:id"
            element={<PrivateRoute user={user} element={<Playlist />} />}
          />
          <Route
            path="/me"
            element={<PrivateRoute user={user} element={<Profile />} />}
          />
          {user && (
            <Route path="/signup" element={<Navigate to="/home" replace />} />
          )}
          {user && (
            <Route path="/login" element={<Navigate to="/home" replace />} />
          )}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      </Fragment>
    </>
  );
}

export default App;
