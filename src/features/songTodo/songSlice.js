import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  songs: [],
};

const songSlice = createSlice({
  name: "song",
  initialState,
  reducers: {
    addItems: (state, action) => {
      const { inputValue, discription } = action.payload;
      const newItem = {
        id: nanoid(),
        title: inputValue,
        description: discription,
      };
      state.songs.push(newItem);
    },
  },
});

export const { addItems, removeItem, editItem } = songSlice.actions;
export default songSlice.reducer;
