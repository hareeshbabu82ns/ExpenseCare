import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  userEmail: null,
};

// user will be equal to the logge in user object

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
