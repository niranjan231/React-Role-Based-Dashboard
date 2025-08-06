// components/EmployeeTable.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteEmployee, updateEmployeeFromUser } from '../features/employeeSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTrash, 
  faEdit, 
  faUser, 
  faEnvelope, 
  faBriefcase, 
  faCalendarAlt, 
  faPhone,
  faSearch
} from '@fortawesome/free-solid-svg-icons';

const EmployeeTable = () => {
  const employees = useSelector(state => state.employee.employees);
  const users = useSelector(state => state.users.users);
  const dispatch = useDispatch();
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [searchTerm, setSearchTerm] = useState('');

  // Sync employee data when users change
  useEffect(() => {
    users.forEach(user => {
      const employeeExists = employees.some(emp => emp.id === user.id);
      
      if (employeeExists) {
        dispatch(updateEmployeeFromUser({
          id: user.id,
          updatedData: {
            name: user.name,
            email: user.email,
            category: user.category,
            role: user.role
          }
        }));
      }
    });
  }, [users, employees, dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      dispatch(deleteEmployee(id));
    }
  };

  // Sorting function
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Search filter - FIXED SYNTAX ERROR HERE
  const filteredEmployees = employees.filter(employee => 
    Object.values(employee).some(value => 
      value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Apply sorting
  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    if (!sortConfig.key) return 0;
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  // Get sort indicator
  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' ? ' ↑' : ' ↓';
  };

  // Role badge styling
  const getRoleBadge = (role) => {
    switch(role) {
      case 'admin': return 'badge bg-danger';
      case 'user': return 'badge bg-primary';
      default: return 'badge bg-secondary';
    }
  };

  // Category badge styling
  const getCategoryBadge = (category) => {
    switch(category) {
      case 'engineer': return 'badge bg-info';
      case 'customer': return 'badge bg-warning text-dark';
      case 'reporting': return 'badge bg-success';
      default: return 'badge bg-light text-dark';
    }
  };

  return (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-white py-3">
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="mb-0">
            <FontAwesomeIcon icon={faUser} className="me-2 text-primary" />
            Employee Directory
          </h4>
          <div className="w-50">
            <div className="input-group">
              <span className="input-group-text bg-light border-0">
                <FontAwesomeIcon icon={faSearch} />
              </span>
              <input
                type="text"
                className="form-control border-0 bg-light"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th onClick={() => requestSort('id')} className="cursor-pointer">
                  ID {getSortIndicator('id')}
                </th>
                <th onClick={() => requestSort('name')} className="cursor-pointer">
                  Employee {getSortIndicator('name')}
                </th>
                <th onClick={() => requestSort('department')} className="cursor-pointer">
                  Department {getSortIndicator('department')}
                </th>
                <th onClick={() => requestSort('designation')} className="cursor-pointer">
                  Designation {getSortIndicator('designation')}
                </th>
                <th onClick={() => requestSort('joinDate')} className="cursor-pointer">
                  Join Date {getSortIndicator('joinDate')}
                </th>
                <th>Contact</th>
                <th>Email</th>
                <th>Role</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedEmployees.map(emp => (
                <tr key={emp.id}>
                  <td className="fw-bold text-muted">#{emp.id}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="bg-light-primary rounded-circle d-flex align-items-center justify-content-center" style={{width: '40px', height: '40px'}}>
                        <span className="text-primary fw-bold fs-6">
                          {emp.name.charAt(0)}
                        </span>
                      </div>
                      <div className="ms-3">
                        <div className="fw-bold">{emp.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>{emp.department}</td>
                  <td>
                    <span className="badge bg-light-primary text-primary">
                      {emp.designation}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <FontAwesomeIcon icon={faCalendarAlt} className="me-2 text-muted" />
                      {emp.joinDate}
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <FontAwesomeIcon icon={faPhone} className="me-2 text-muted" />
                      {emp.contact}
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <FontAwesomeIcon icon={faEnvelope} className="me-2 text-muted" />
                      <span className="text-truncate d-inline-block" style={{maxWidth: '150px'}}>
                        {emp.email}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className={getRoleBadge(emp.role)}>
                      {emp.role}
                    </span>
                  </td>
                  <td>
                    <span className={getCategoryBadge(emp.category)}>
                      {emp.category}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <button 
                        className="btn btn-sm btn-light-primary"
                        onClick={() => {/* Add edit functionality here */}}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button 
                        className="btn btn-sm btn-light-danger"
                        onClick={() => handleDelete(emp.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {sortedEmployees.length === 0 && (
                <tr>
                  <td colSpan="10" className="text-center py-5">
                    <div className="d-flex flex-column align-items-center">
                      <div className="bg-light rounded-circle p-4 mb-3">
                        <FontAwesomeIcon icon={faUser} className="text-muted fs-1" />
                      </div>
                      <h5 className="text-muted">No employees found</h5>
                      <p className="text-muted mb-0">
                        {searchTerm 
                          ? `No results for "${searchTerm}"` 
                          : 'Add new employees to get started'}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card-footer bg-white py-3">
        <div className="d-flex justify-content-between align-items-center">
          <div className="text-muted">
            Showing <strong>{sortedEmployees.length}</strong> of <strong>{employees.length}</strong> employees
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-sm btn-outline-secondary">
              <i className="bi bi-arrow-clockwise me-1"></i> Refresh
            </button>
            <button className="btn btn-sm btn-primary">
              <i className="bi bi-plus-lg me-1"></i> Add Employee
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTable;