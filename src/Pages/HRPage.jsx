// src/pages/HRPage.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import EmployeeForm from '../components/EmployeeForm';
import EmployeeTable from '../components/EmployeeTable';

const HRPage = () => {
  const userRole = useSelector(state => state.auth?.user?.role); // Get current user's role

  return (
    <div className="container mt-4">
      <h2>HR Dashboard</h2>

      {/* Only Admin and HR can see this form */}
      {(userRole === 'admin' || userRole === 'HR') && <EmployeeForm />}

      {/* All roles can see the employee table */}
      <EmployeeTable />
    </div>
  );
};

export default HRPage;
