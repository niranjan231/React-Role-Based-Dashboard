import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateUserCategory,
  updateUserRole,
  addUser,
} from "../features/usersSlice";

export default function UsersTable() {
  const users = useSelector((state) => state.users.users);
  const role = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    category: "engineer",
    role: "user",
  });

  const handleCategoryChange = (userId, newCategory) => {
    dispatch(updateUserCategory({ userId, newCategory }));
  };

  const handleRoleChange = (userId, newRole) => {
    dispatch(updateUserRole({ userId, newRole }));
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email || !newUser.password) {
      alert("Please fill all fields");
      return;
    }

    const userWithId = {
      ...newUser,
      id: Date.now(),
    };

    dispatch(addUser(userWithId));

    setNewUser({
      name: "",
      email: "",
      password: "",
      category: "engineer",
      role: "user",
    });
  };

  return (
    <div className="container">
      {role === "admin" && (
        <form className="mb-4" onSubmit={handleCreateUser}>
          <h4>Create New User</h4>
          <div className="row g-2">
            <div className="col-md-2">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
              />
            </div>
            <div className="col-md-2">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
            </div>
            <div className="col-md-2">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
              />
            </div>
            <div className="col-md-2">
              <select
                className="form-select"
                value={newUser.category}
                onChange={(e) =>
                  setNewUser({ ...newUser, category: e.target.value })
                }
              >
                <option value="engineer">Engineer</option>
                <option value="customer">Customer</option>
                <option value="reporting">Reporting</option>
              </select>
            </div>
            <div className="col-md-2">
              <select
                className="form-select"
                value={newUser.role}
                onChange={(e) =>
                  setNewUser({ ...newUser, role: e.target.value })
                }
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="col-md-2">
              <button type="submit" className="btn btn-primary w-100">
                Create User
              </button>
            </div>
          </div>
        </form>
      )}

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>
                {role === "admin" ? (
                  <select
                    value={user.category}
                    onChange={(e) =>
                      handleCategoryChange(user.id, e.target.value)
                    }
                    className="form-select"
                  >
                    <option value="engineer">Engineer</option>
                    <option value="customer">Customer</option>
                    <option value="reporting">Reporting</option>
                  </select>
                ) : (
                  user.category
                )}
              </td>
              <td>
                {role === "admin" ? (
                  <select
                    value={user.role}
                    onChange={(e) =>
                      handleRoleChange(user.id, e.target.value)
                    }
                    className="form-select"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                ) : (
                  user.role
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
