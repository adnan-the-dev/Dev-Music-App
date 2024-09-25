import { configureStore } from "@reduxjs/toolkit";
import songSlice from "../features/songTodo/songSlice";

export const store = configureStore({
  reducer: songSlice,
});
