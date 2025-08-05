import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser, updateUserCategory, updateUserRole } from "../features/usersSlice";
import CreateUserModal from "../Pages/CreateUserModal";

export default function UsersTable() {
  const users = useSelector((state) => state.users.users);
  const role = useSelector((state) => state.auth.role);
  const currentUserId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterRole, setFilterRole] = useState("all");

  const handleCategoryChange = (userId, newCategory) => {
    dispatch(updateUserCategory({ userId, newCategory }));
  };

  const handleRoleChange = (userId, newRole) => {
    dispatch(updateUserRole({ userId, newRole }));
  };

  const handleAddUser = (userData) => {
    const newUser = {
      ...userData,
      id: users.length ? users[users.length - 1].id + 1 : 1,
    };
    dispatch(addUser(newUser));
  };

  // Filter users based on search and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || user.category === filterCategory;
    const matchesRole = filterRole === "all" || user.role === filterRole;
    
    return matchesSearch && matchesCategory && matchesRole;
  });

  const categoryBadge = {
    engineer: "bg-primary",
    customer: "bg-info",
    reporting: "bg-warning",
  };

  const roleBadge = {
    admin: "bg-danger",
    user: "bg-secondary",
  };

  // Function to generate user avatar
  const getUserAvatar = (name) => {
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
    const colors = ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b', '#858796'];
    const color = colors[initials.charCodeAt(0) % colors.length];
    
    return (
      <div 
        className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
        style={{
          width: '40px', 
          height: '40px',
          backgroundColor: color,
          fontSize: '0.9rem'
        }}
      >
        {initials}
      </div>
    );
  };

  return (
    <div className="card border-0 shadow-lg rounded-3 overflow-hidden mb-4">
      {/* Card Header */}
      <div className="card-header bg-gradient-primary text-white py-3">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h2 className="h4 mb-0">
              <i className="bi bi-people-fill me-2"></i>User Management
            </h2>
            <p className="mb-0 small opacity-75">Manage all users in your organization</p>
          </div>
          {role === "admin" && (
            <button
              className="btn btn-light d-flex align-items-center"
              onClick={() => setShowCreateModal(true)}
            >
              <i className="bi bi-plus-circle me-2"></i> Create User
            </button>
          )}
        </div>
      </div>

      {/* Filter Section */}
      <div className="card-body bg-light py-3 border-bottom">
        <div className="row g-3">
          <div className="col-md-4">
            <div className="input-group">
              <span className="input-group-text bg-white">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="col-md-4">
            <select 
              className="form-select"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="engineer">Engineer</option>
              <option value="customer">Customer</option>
              <option value="reporting">Reporting</option>
            </select>
          </div>
          
          <div className="col-md-4">
            <select 
              className="form-select"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
        </div>
      </div>

      {/* Create User Modal */}
      <CreateUserModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleAddUser}
      />

      {/* Users Table */}
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th className="ps-4">User</th>
              <th>Category</th>
              <th>Role</th>
              <th className="text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-5">
                  <i className="bi bi-people display-5 text-muted mb-3"></i>
                  <h5 className="text-muted">No users found</h5>
                  <p className="text-muted">Try adjusting your search or create a new user</p>
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => {
                const canEdit =
                  role === "admin" || (role === "user" && user.id === currentUserId);

                return (
                  <tr 
                    key={user.id} 
                    className={canEdit ? "hover-row" : ""}
                    style={{ cursor: canEdit ? "pointer" : "default" }}
                  >
                    <td className="ps-4">
                      <div className="d-flex align-items-center">
                        {getUserAvatar(user.name)}
                        <div className="ms-3">
                          <div className="fw-medium">{user.name}</div>
                          <div className="text-muted small">ID: {user.id}</div>
                        </div>
                      </div>
                    </td>

                    <td>
                      {canEdit ? (
                        <select
                          className={`form-select form-select-sm w-auto shadow-sm`}
                          value={user.category}
                          onChange={(e) => handleCategoryChange(user.id, e.target.value)}
                        >
                          <option value="engineer">Engineer</option>
                          <option value="customer">Customer</option>
                          <option value="reporting">Reporting</option>
                        </select>
                      ) : (
                        <span
                          className={`badge ${categoryBadge[user.category] || "bg-secondary"} rounded-pill px-3 py-1 d-inline-flex align-items-center`}
                        >
                          <i className="bi bi-tag me-1"></i>
                          {user.category.charAt(0).toUpperCase() + user.category.slice(1)}
                        </span>
                      )}
                    </td>

                    <td>
                      {canEdit ? (
                        <select
                          className={`form-select form-select-sm w-auto shadow-sm`}
                          value={user.role}
                          onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      ) : (
                        <span
                          className={`badge ${roleBadge[user.role] || "bg-secondary"} rounded-pill px-3 py-1 d-inline-flex align-items-center`}
                        >
                          <i className="bi bi-shield me-1"></i>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                      )}
                    </td>
                    
                    <td className="text-center">
                      <span className="badge bg-success rounded-pill px-3 py-1">
                        <i className="bi bi-check-circle me-1"></i>Active
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      
      {/* Card Footer */}
      <div className="card-footer bg-light py-3">
        <div className="d-flex justify-content-between align-items-center">
          <div className="text-muted">
            Showing <span className="fw-bold">{filteredUsers.length}</span> of <span className="fw-bold">{users.length}</span> users
          </div>
          <div>
            <button className="btn btn-sm btn-outline-secondary me-2">
              <i className="bi bi-arrow-clockwise"></i> Refresh
            </button>
            <button className="btn btn-sm btn-outline-primary">
              <i className="bi bi-download me-1"></i> Export
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}