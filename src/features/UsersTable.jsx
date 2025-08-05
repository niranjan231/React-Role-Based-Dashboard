import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser, updateUserCategory, updateUserRole } from "../features/usersSlice";
import CreateUserModal from "../Pages/CreateUserModal";

export default function UsersTable() {
  const users = useSelector((state) => state.users.users);
  const role = useSelector((state) => state.auth.role);
  const currentUserId = useSelector((state) => state.auth.user?.id); // get logged-in user id
  const dispatch = useDispatch();

  const [showCreateModal, setShowCreateModal] = useState(false);

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

  const categoryBadge = {
    engineer: "primary",
    customer: "info",
    reporting: "warning",
  };

  const roleBadge = {
    admin: "danger",
    user: "secondary",
  };

  return (
    <div className="card shadow-sm border-0">
      <div className="card-header d-flex justify-content-between align-items-center bg-primary text-white">
        <h5 className="mb-0">User Management</h5>
        {role === "admin" && (
          <button
            className="btn btn-light btn-sm"
            onClick={() => setShowCreateModal(true)}
          >
            + Create User
          </button>
        )}
      </div>

      <CreateUserModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleAddUser}
      />

      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const canEdit =
                role === "admin" || (role === "user" && user.id === currentUserId);

              return (
                <tr key={user.id} style={{ cursor: canEdit ? "pointer" : "default" }}>
                  <td>{user.name}</td>

                  <td>
                    {canEdit ? (
                      <select
                        className={`form-select form-select-sm w-auto`}
                        value={user.category}
                        onChange={(e) => handleCategoryChange(user.id, e.target.value)}
                      >
                        <option value="engineer">Engineer</option>
                        <option value="customer">Customer</option>
                        <option value="reporting">Reporting</option>
                      </select>
                    ) : (
                      <span
                        className={`badge bg-${
                          categoryBadge[user.category] || "secondary"
                        }`}
                      >
                        {user.category.charAt(0).toUpperCase() + user.category.slice(1)}
                      </span>
                    )}
                  </td>

                  <td>
                    {canEdit ? (
                      <select
                        className={`form-select form-select-sm w-auto`}
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    ) : (
                      <span
                        className={`badge bg-${roleBadge[user.role] || "secondary"}`}
                      >
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
