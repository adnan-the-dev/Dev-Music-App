import { createSlice } from "@reduxjs/toolkit";

const playingSlice = createSlice({
  name: "playing",
  initialState: {
    currentSong: null,
    isPlaying: false,
  },
  reducers: {
    playSong(state, action) {
      state.currentSong = action.payload; // Store the whole song object
    },
    pauseSong(state) {
      state.isPlaying = false;
    },
    togglePlay(state) {
      state.isPlaying = !state.isPlaying;
    },
  },
});

export const { playSong, pauseSong, togglePlay } = playingSlice.actions;
export default playingSlice.reducer;
