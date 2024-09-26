import { configureStore } from "@reduxjs/toolkit";
import songsReducer from "./slices/songsSlice";
import playlistsReducer from "./slices/playlistsSlice";
import playingReducer from "./slices/playingSlice";

const store = configureStore({
  reducer: {
    songs: songsReducer,
    playlists: playlistsReducer,
    playing: playingReducer,
  },
});

export default store;
