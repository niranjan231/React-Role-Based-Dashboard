import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [
    {
      id: 1,
      name: "Admin User",
      email: "admin",
      password: "admin123",
      category: "engineer",
      role: "admin",
    },
    {
      id: 2,
      name: "Normal User",
      email: "user",
      password: "user123",
      category: "customer",
      role: "user",
    },
    {
      id: 3,
      name: "Raj Verma",
      email: "raj@example.com",
      password: "12345678",
      role: "user",
      category: "engineer",
    },
    {
      id: 4,
      name: "Pooja Sharma",
      email: "pooja@example.com",
      password: "12345678",
      role: "user",
      category: "customer",
    },
    {
      id: 5,
      name: "Amit Yadav",
      email: "amit@example.com",
      password: "12345678",
      role: "user",
      category: "reporting",
    },
    {
      id: 6,
      name: "Neha Singh",
      email: "neha@example.com",
      password: "12345678",
      role: "user",
      category: "engineer",
    },
    {
      id: 7,
      name: "Ravi Thakur",
      email: "ravi@example.com",
      password: "12345678",
      role: "user",
      category: "customer",
    },
    {
      id: 8,
      name: "Simran Kaur",
      email: "simran@example.com",
      password: "12345678",
      role: "user",
      category: "reporting",
    },
    {
      id: 9,
      name: "Vivek Mehra",
      email: "vivek@example.com",
      password: "12345678",
      role: "user",
      category: "engineer",
    },
    {
      id: 10,
      name: "Anjali Chauhan",
      email: "anjali@example.com",
      password: "12345678",
      role: "user",
      category: "customer",
    },
    {
      id: 11,
      name: "Nikhil Kapoor",
      email: "nikhil@example.com",
      password: "12345678",
      role: "user",
      category: "reporting",
    },
    {
      id: 12,
      name: "Kavita Rathi",
      email: "kavita@example.com",
      password: "12345678",
      role: "user",
      category: "engineer",
    },
  ],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    updateUserCategory: (state, action) => {
      const { userId, newCategory } = action.payload;
      const user = state.users.find((u) => u.id === userId);
      if (user) {
        user.category = newCategory;
      }
    },
    updateUserRole: (state, action) => {
      const { userId, newRole } = action.payload;
      const user = state.users.find((u) => u.id === userId);
      if (user) {
        user.role = newRole;
      }
    },
  },
});

export const { addUser, updateUserCategory, updateUserRole } = usersSlice.actions;
export default usersSlice.reducer;
