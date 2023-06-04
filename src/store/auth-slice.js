import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

// user will be equal to the logge in user object

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
