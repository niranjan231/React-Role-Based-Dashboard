import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [
    {
      id: 1,
      title: "Fix login bug",
      description: "Users cannot login from mobile.",
      assignedTo: 3, // user id
      status: "Pending", // Pending, In Progress, Done
      dueDate: "2025-09-10",
    },
    {
      id: 2,
      title: "Prepare sales report",
      description: "Monthly sales report for August",
      assignedTo: 11,
      status: "In Progress",
      dueDate: "2025-09-15",
    },
  ],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    updateTaskStatus: (state, action) => {
      const { taskId, status } = action.payload;
      const task = state.tasks.find((t) => t.id === taskId);
      if (task) {
        task.status = status;
      }
    },
    assignTask: (state, action) => {
      const { taskId, userId } = action.payload;
      const task = state.tasks.find((t) => t.id === taskId);
      if (task) {
        task.assignedTo = userId;
      }
    },
  },
});

export const { addTask, updateTaskStatus, assignTask } = tasksSlice.actions;
export default tasksSlice.reducer;
