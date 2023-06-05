import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  userEmail: null,
};

/* State to provide and set the logged in user's userId and email */

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUserId(state, action) {
      state.userId = action.payload;
    },
    setUserEmail(state, action) {
      state.userEmail = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
