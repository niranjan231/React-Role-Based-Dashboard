import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../features/usersSlice";
import authReducer from "../features/authSlice";
import tasksReducer from "../features/tasksSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    auth: authReducer,
    tasks: tasksReducer,
  },
});
