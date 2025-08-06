// features/employeeSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Get initial users from localStorage or use default users
const storedUsers = JSON.parse(localStorage.getItem("users"));
const initialUsers = storedUsers || [
  // ... your user data here (same as in usersSlice)
];

// Create employee records from existing users
const userBasedEmployees = initialUsers.map(user => ({
  id: user.id,
  name: user.name,
  email: user.email,
  department: 'General', // Default department
  designation: 'Staff', // Default designation
  joinDate: new Date().toISOString().split('T')[0], // Today's date
  contact: 'N/A', // Default contact
  category: user.category,
  role: user.role
}));

// Combine with existing employees
const storedEmployees = JSON.parse(localStorage.getItem('employees'));
const initialState = {
  employees: storedEmployees || userBasedEmployees,
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      state.employees.push(action.payload);
      localStorage.setItem('employees', JSON.stringify(state.employees));
    },
    editEmployee: (state, action) => {
      const index = state.employees.findIndex(emp => emp.id === action.payload.id);
      if (index !== -1) {
        state.employees[index] = action.payload;
        localStorage.setItem('employees', JSON.stringify(state.employees));
      }
    },
    deleteEmployee: (state, action) => {
      state.employees = state.employees.filter(emp => emp.id !== action.payload);
      localStorage.setItem('employees', JSON.stringify(state.employees));
    },
    // New reducer to sync with user updates
    updateEmployeeFromUser: (state, action) => {
      const { id, updatedData } = action.payload;
      const index = state.employees.findIndex(emp => emp.id === id);
      if (index !== -1) {
        state.employees[index] = { 
          ...state.employees[index], 
          ...updatedData 
        };
        localStorage.setItem('employees', JSON.stringify(state.employees));
      }
    }
  },
});

export const { addEmployee, editEmployee, deleteEmployee, updateEmployeeFromUser } = employeeSlice.actions;
export default employeeSlice.reducer;