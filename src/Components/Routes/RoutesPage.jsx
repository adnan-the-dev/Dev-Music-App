import React from "react";
import Home from "../../Pages/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import LikedSongs from "../../Pages/LikedSongs";
import Library from "../../Pages/Library";
import Search from "../../Pages/Search";
import Playlist from "../../Pages/Playlist";
import Profile from "../../Pages/Profile";
import SignUp from "../../Pages/SignUp";
import Login from "../../Pages/Login";
import NotFound from "../../Pages/NotFound";
import Main from "../../Pages/Main";
import { useAuth } from "../../utils/useAuth";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import AudioPlayer from "../../Components/AudioPlayer";
import CreatePlaylist from "../CreatePlaylist";
import SidebarMui from "../SidebarMui";
import MusicUploadForm from "../MusicUploadForm/MusicUploadForm";

function RoutesPage() {
  return (
    // <Routes>
    //   <Route element={<PrivateRoutes />}>
    //     <Route path="*" element={<Error />} />
    //     <Route path="/order-confirmation" element={<OrderConfirmation />} />
    //     <Route path="/previous-order" element={<PreviousOrderPage />} />
    //     <Route element={<Home />} path="/" />
    //   </Route>

    //   <Route element={<PublicRoutes />}>
    //     <Route element={<Home />} path="/home" />
    //     <Route element={<Login />} path="/login" />
    //     <Route element={<Signup />} path="/signup" />
    //     <Route element={<SignupForm />} path="/signup" />
    //     <Route element={<OTP />} path="/otp" />
    //     <Route element={<GuestOrderConfirmation />} path="/guest-order" />
    //     <Route element={<CreateUserProfile />} path="/create-user-profile" />
    //   </Route>
    // </Routes>

    <>
      {useAuth() ? (
        <>
          {/* <Navbar /> */}
          {/* <Sidebar /> */}
          <SidebarMui />
          {/* <AudioPlayer /> */}
          <div
            style={{
              padding: "6rem 0 0 26rem",
              backgroundColor: "#181818",
              color: "#ffffff",
              minHeight: "calc(100vh - 6rem)",
            }}
          >
            <Routes>
              {/* <Route path="/sideBar" element={<Sidebar />} /> */}
              <Route path="/home" element={<Home />} />
              <Route path="/collection/tracks" element={<LikedSongs />} />
              <Route path="/collection/playlists" element={<Library />} />
              <Route path="/search" element={<Search />} />
              <Route path="/playlist/:id" element={<Playlist />} />
              <Route path="/me" element={<Profile />} />
              <Route path="/add-playList" element={<CreatePlaylist />} />
              <Route path="/add-song" element={<MusicUploadForm />} />
              <Route path="/not-found" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/not-found" replace />} />
            </Routes>
          </div>
        </>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Login />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default RoutesPage;
