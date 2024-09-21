import React, { Fragment, useEffect, useState } from "react";
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
// import PrivateRoute from "./PrivateRoute"
// import { Navigate, Route, Routes, useLocation } from "react -router-dom";
function App() {
  const user = true;
  // const [user, setUser] = useState(false);
  // const location = useLocation();
  // // const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     setUser(true);
  //   }
  // }, []);

  return (
    <>
      <>
        {/* <Navbar /> */}
        {/* <Sidebar /> */}
        <AudioPlayer />
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

      {/* <Fragment>
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
          {user ? (
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/collection/tracks" element={<LikedSongs />} />
              <Route path="/collection/playlists" element={<Library />} />
              <Route path="/search" element={<Search />} />
              <Route path="/playlist/:id" element={<Playlist />} />
              <Route path="/me" element={<Profile />} />
              <Route path="/songs" element={<CreateSong />} />
            </>
          ) : (
            <>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/not-found" />} />
            </>
          )}
          <Route path="/not-found" element={<NotFound />} />
        </Routes>
      </Fragment> */}

      {/* <Fragment>
        <PrivateRoute exact user={user} path="/home" component={Home} />
         <PrivateRoute
            exact
            user={user}
            path="/collection/tracks"
            component={LikedSongs}
          />
          <PrivateRoute
            exact
            user={user}
            path="/collection/playlists"
            component={Library}
          />
          <PrivateRoute exact user={user} path="/search" component={Search} />
          <PrivateRoute
            exact
            user={user}
            path="/playlist/:id"
            component={Playlist}
          />
          <PrivateRoute exact user={user} path="/me" component={Profile} />
          {user && <Redirect from="/signup" to="/home" />}
          {user && <Redirect from="/login" to="/home" />}
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/not-found" component={NotFound} />
        <Redirect to="/not-found" /> 
      </Fragment> */}
    </>
  );
}

export default App;
