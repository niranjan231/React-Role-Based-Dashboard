// src/features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
    role: null,
  },
  reducers: {
    login: (state, action) => {
      const { username, password } = action.payload;

      if (username === "admin" && password === "admin123") {
        state.isAuthenticated = true;
        state.user = "admin";
        state.role = "admin";
      } else if (username === "user" && password === "user123") {
        state.isAuthenticated = true;
        state.user = "user";
        state.role = "user";
      } else {
        state.isAuthenticated = false;
        state.user = null;
        state.role = null;
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.role = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
