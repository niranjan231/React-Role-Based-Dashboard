import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser, updateUserCategory, updateUserRole, updateUser, deleteUser } from "../features/usersSlice";
import CreateUserModal from "../Pages/CreateUserModal";
import { logout } from "./authSlice";
import { FaUser, FaEnvelope, FaShieldAlt, FaTag, FaPhone, FaMapMarkerAlt, FaSave, FaEdit, FaLock, FaGlobe, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

// Define module-based permissions
const MODULE_PERMISSIONS = {
  USER_MANAGEMENT: {
    CREATE: "user:create",
    EDIT: "user:edit",
    DELETE: "user:delete",
    EXPORT: "user:export",
    MANAGE_ROLES: "user:manage_roles",
    MANAGE_CATEGORIES: "user:manage_categories"
  }
};

export default function UsersTable() {
  const { role, isAuthenticated } = useSelector((state) => state.auth);
  const users = useSelector((state) => state.users.users);
  const currentUser = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterRole, setFilterRole] = useState("all");
  const [editingUserId, setEditingUserId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    website: '',
    role: '',
    category: ''
  });

  // 🧠 Check permissions helper function
  const hasPermission = (permission) => {
    if (currentUser.role === "admin") return true;
    return currentUser.user?.permissions?.includes(permission);
  };

  const handleCategoryChange = (userId, newCategory) => {
    if (!hasPermission(MODULE_PERMISSIONS.USER_MANAGEMENT.MANAGE_CATEGORIES)) return;
    dispatch(updateUserCategory({ userId, newCategory }));
  };

  const handleRoleChange = (userId, newRole) => {
    if (!hasPermission(MODULE_PERMISSIONS.USER_MANAGEMENT.MANAGE_ROLES)) return;
    dispatch(updateUserRole({ userId, newRole }));
  };

  const handleAddUser = (userData) => {
    const newUser = {
      ...userData,
      id: users.length ? users[users.length - 1].id + 1 : 1,
    };
    dispatch(addUser(newUser));
  };

  // 🔐 Show all users only if admin, else show current user only
  const filteredUsersRaw = currentUser.role === 'admin'
    ? users
    : users.filter(user => user.email === currentUser.user?.email);

  // Apply filter and search
  const filteredUsers = filteredUsersRaw.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || user.category === filterCategory;
    const matchesRole = filterRole === "all" || user.role === filterRole;
    return matchesSearch && matchesCategory && matchesRole;
  });

  // ✅ Handle row click for profile navigation
  const handleRowClick = (user, e) => {
    // Ignore clicks on form elements
    if (e.target.tagName === 'SELECT' || e.target.tagName === 'OPTION' ||
      e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT') {
      return;
    }

    if (user.email === currentUser.user?.email) {
      navigate("/profile");
    }
  };

  const handleEdit = (user) => {
    if (hasPermission(MODULE_PERMISSIONS.USER_MANAGEMENT.EDIT)) {
      setEditingUserId(user.id);
      setEditFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        website: user.website || '',
        role: user.role || '',
        category: user.category || ''
      });
    }
  };

  const handleSaveEdit = (userId) => {
    dispatch(updateUser({
      id: userId,
      updatedData: editFormData
    }));

    setEditingUserId(null);
    toast.success('User updated successfully!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
  };

  const handleEditChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleDelete = (userId, userEmail) => {
    if (!hasPermission(MODULE_PERMISSIONS.USER_MANAGEMENT.DELETE)) return;

    if (userEmail === currentUser.user?.email) {
      alert("You cannot delete your own account!");
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      dispatch(deleteUser(userId));
    }
  };

  const categoryBadge = {
    engineer: "bg-primary",
    customer: "bg-info",
    reporting: "bg-warning",
  };

  const roleBadge = {
    admin: "bg-danger",
    user: "bg-secondary",
  };

  const getUserAvatar = (name) => {
    if (!name) return null;

    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
    const colors = ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b', '#858796'];
    const colorIndex = name.charCodeAt(0) % colors.length;
    return (
      <div className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
        style={{
          width: '40px',
          height: '40px',
          backgroundColor: colors[colorIndex],
          fontSize: '0.9rem'
        }}>
        {initials}
      </div>
    );
  };

  return (
    <div className="card border-0 shadow-lg rounded-3 overflow-hidden mb-4">
      <div className="card-header bg-primary text-light py-3">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="h4 mb-0 text-white">
            <i className="bi bi-people-fill me-2"></i>
            {currentUser.role === 'admin' ? 'User Management' : 'My Profile'}
          </h2>
          {hasPermission(MODULE_PERMISSIONS.USER_MANAGEMENT.CREATE) && (
            <button className="btn btn-outline-light d-flex align-items-center shadow-sm fw-semibold" onClick={() => setShowCreateModal(true)}>
              <i className="bi bi-person-plus-fill me-2 fs-5"></i> Create User
            </button>
          )}
        </div>
      </div>

      <div className="card-body bg-light py-3 border-bottom">
        <div className="row g-3">
          <div className="col-md-4">
            <div className="input-group">
              <span className="input-group-text bg-white"><i className="bi bi-search"></i></span>
              <input type="text" className="form-control" placeholder="Search by name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
          </div>
          <div className="col-md-4">
            <select className="form-select" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
              <option value="all">All Categories</option>
              <option value="engineer">Engineer</option>
              <option value="customer">Customer</option>
              <option value="reporting">Reporting</option>
            </select>
          </div>
          <div className="col-md-4">
            <select className="form-select" value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
        </div>
      </div>

      <CreateUserModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleAddUser}
        disabled={!hasPermission(MODULE_PERMISSIONS.USER_MANAGEMENT.CREATE)}
      />

      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th className="ps-4">User</th>
              <th>Category</th>
              <th>Role</th>
              <th className="text-center">Status</th>
              {hasPermission(MODULE_PERMISSIONS.USER_MANAGEMENT.EDIT) && (
                <th className="text-center">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={hasPermission(MODULE_PERMISSIONS.USER_MANAGEMENT.EDIT) ? 5 : 4} className="text-center py-5">
                  <i className="bi bi-people display-5 text-muted mb-3"></i>
                  <h5 className="text-muted">No users found</h5>
                  <p className="text-muted">Try adjusting your search or create a new user</p>
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => {
                const canEditCategory = hasPermission(MODULE_PERMISSIONS.USER_MANAGEMENT.MANAGE_CATEGORIES) && (currentUser.role === "admin" || user.id === currentUser.userId);
                const canEditRole = hasPermission(MODULE_PERMISSIONS.USER_MANAGEMENT.MANAGE_ROLES) && (currentUser.role === "admin" || user.id === currentUser.userId);
                const isCurrentUser = user.email === currentUser.user?.email;
                const canPerformActions = hasPermission(MODULE_PERMISSIONS.USER_MANAGEMENT.EDIT) ||
                  hasPermission(MODULE_PERMISSIONS.USER_MANAGEMENT.DELETE);
                const isEditingThisUser = editingUserId === user.id;

                return (
                  <tr
                    key={user.id}
                    className={`${isEditingThisUser ? "table-warning" : ""} ${isCurrentUser ? "table-success" : ""}`}
                    style={{
                      cursor: isCurrentUser ? "pointer" : "default"
                    }}
                    onClick={(e) => handleRowClick(user, e)}
                  >
                    <td className="ps-4">
                      <div className="d-flex align-items-center">
                        {getUserAvatar(user.name)}
                        <div className="ms-3">
                          {isEditingThisUser ? (
                            <div className="mb-2">
                              <div className="input-group input-group-sm">
                                <span className="input-group-text">
                                  <FaUser className="text-muted" />
                                </span>
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  name="name"
                                  value={editFormData.name}
                                  onChange={handleEditChange}
                                  placeholder="Full Name"
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="fw-medium">{user.name}</div>
                          )}

                          <div className="text-muted small">
                            {isEditingThisUser ? (
                              <div className="input-group input-group-sm">
                                <span className="input-group-text">
                                  <FaEnvelope className="text-muted" />
                                </span>
                                <input
                                  type="email"
                                  className="form-control form-control-sm"
                                  name="email"
                                  value={editFormData.email}
                                  onChange={handleEditChange}
                                  placeholder="Email"
                                />
                              </div>
                            ) : (
                              `ID: ${user.id} | Email: ${user.email}`
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>
                      {isEditingThisUser ? (
                        <select
                          className="form-select form-select-sm"
                          name="category"
                          value={editFormData.category}
                          onChange={handleEditChange}
                        >
                          <option value="engineer">Engineer</option>
                          <option value="customer">Customer</option>
                          <option value="reporting">Reporting</option>
                        </select>
                      ) : canEditCategory ? (
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
                        <span className={`badge ${categoryBadge[user.category] || "bg-secondary"} rounded-pill px-3 py-1`}>
                          <i className="bi bi-tag me-1"></i>{user.category.charAt(0).toUpperCase() + user.category.slice(1)}
                        </span>
                      )}
                    </td>

                    <td>
                      {isEditingThisUser ? (
                        <select
                          className="form-select form-select-sm"
                          name="role"
                          value={editFormData.role}
                          onChange={handleEditChange}
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      ) : canEditRole ? (
                        <select
                          className={`form-select form-select-sm w-auto shadow-sm`}
                          value={user.role}
                          onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      ) : (
                        <span className={`badge ${roleBadge[user.role] || "bg-secondary"} rounded-pill px-3 py-1`}>
                          <i className="bi bi-shield me-1"></i>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                      )}
                    </td>

                    <td className="text-center">
                      <span className="badge bg-success bg-gradient rounded-pill px-4 py-2 fs-6 shadow-sm d-inline-flex align-items-center">
                        <i className="bi bi-check-circle-fill me-2 fs-5"></i>
                        Active
                      </span>
                    </td>

                    {/* Actions Column */}
                    {canPerformActions && (
                      <td className="text-center">
                        <div className="d-flex justify-content-center gap-2">
                          {isEditingThisUser ? (
                            <>
                              <button
                                className="btn btn-sm btn-outline-success"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSaveEdit(user.id);
                                }}
                                title="Save changes"
                              >
                                <FaSave />
                              </button>
                              <button
                                className="btn btn-sm btn-outline-secondary"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCancelEdit();
                                }}
                                title="Cancel edit"
                              >
                                <FaTimes />
                              </button>
                            </>
                          ) : (
                            <>
                              {hasPermission(MODULE_PERMISSIONS.USER_MANAGEMENT.EDIT) && (
                                <button
                                  className="btn btn-sm btn-primary text-white"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEdit(user);
                                  }}
                                  title="Edit user"
                                >
                                  <i className="bi bi-pencil"></i> Edit
                                </button>

                              )}

                              {hasPermission(MODULE_PERMISSIONS.USER_MANAGEMENT.DELETE) && (
                                <button
                                  className="btn btn-sm btn-danger text-white"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(user.id, user.email);
                                  }}
                                  disabled={user.email === currentUser.user?.email}
                                  title={user.email === currentUser.user?.email
                                    ? "Cannot delete your own account"
                                    : "Delete user"}
                                >
                                  <i className="bi bi-pencil"></i>Delete
                                </button>

                              )}
                            </>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="card-footer bg-light py-3">
        <div className="d-flex justify-content-between align-items-center">
          <div className="text-muted">
            Showing <span className="fw-bold">{filteredUsers.length}</span> of <span className="fw-bold">{filteredUsersRaw.length}</span> users
          </div>
          <div>
            <button className="btn btn-sm btn-outline-secondary me-2">
              <i className="bi bi-arrow-clockwise"></i> Refresh
            </button>
            {hasPermission(MODULE_PERMISSIONS.USER_MANAGEMENT.EXPORT) && (
              <button className="btn btn-sm btn-outline-primary">
                <i className="bi bi-download me-1"></i> Export
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}