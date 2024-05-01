import { createSlice } from "@reduxjs/toolkit";

const intialAuthState = { isAuth: false, email: null };

const authSlice = createSlice({
  name: "Authentication",
  initialState: intialAuthState,
  reducers: {
    setTrue(state) {
      state.isAuth = true;
    },
    setFalse(state) {
      state.isAuth = false;
    },
    setEmail(state, action) {
        state.email = action.payload
    }
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
