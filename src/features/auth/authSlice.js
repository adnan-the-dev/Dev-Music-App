import { createSlice } from "@reduxjs/toolkit";

export const INITIAL_STATE = {
  loginResponse: null,
  user: null,
  isSuccess: false,
};

const authorizeSlice = createSlice({
  name: "authorize",
  initialState: INITIAL_STATE,
  reducers: {
    loginResponse(state, { payload }) {
      return {
        ...state,
        loginResponse: payload.response,
      };
    },
    authorizeUser: (state, action) => {
      state.user = action.payload;
    },
    registerUser: (state) => state,
    updateAuthSuccessStatus(state, { payload }) {
      return {
        ...state,
        isSuccess: payload,
      };
    },
    logOutUser: (state) => {
      Object.assign(state, INITIAL_STATE);
    },
  },
});

export const {
  loginResponse,
  updateAuthSuccessStatus,
  authorizeUser,
  registerUser,
  logOutUser,
} = authorizeSlice.actions;

export default authorizeSlice.reducer;
