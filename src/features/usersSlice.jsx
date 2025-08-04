// src/features/users/usersSlice.js
import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
  { id: 1, name: "User One", email: "userone@example.com" },
  { id: 2, name: "User Two", email: "usertwo@example.com" },
  { id: 3, name: "User Three", email: "userthree@example.com" },
  { id: 4, name: "User Four", email: "userfour@example.com" },
  { id: 5, name: "User Five", email: "userfive@example.com" },
  { id: 6, name: "User Six", email: "usersix@example.com" },
  { id: 7, name: "User Seven", email: "userseven@example.com" },
  { id: 8, name: "User Eight", email: "usereight@example.com" },
  { id: 9, name: "User Nine", email: "usernine@example.com" },
  { id: 10, name: "User Ten", email: "userten@example.com" },
];


const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    deleteUser: (state, action) => state.filter(user => user.id !== action.payload),
    editUser: (state, action) => {
      const { id, name, email } = action.payload;
      const user = state.find(u => u.id === id);
      if (user) {
        user.name = name;
        user.email = email;
      }
    },
    postUser: (state, action) => {
      state.push({ id: nanoid(), ...action.payload });
    },
  },
});

export const { deleteUser, editUser, postUser } = usersSlice.actions;
export default usersSlice.reducer;
