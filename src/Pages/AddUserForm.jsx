import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../features/usersSlice";

export default function AddUserForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    category: "engineer",
  });

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser(formData));
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "user",
      category: "engineer",
    });
  };

  return (
    <form className="card p-3 mb-4" onSubmit={handleSubmit}>
      <h4>Create New User</h4>
      <input
        type="text"
        placeholder="Name"
        className="form-control my-1"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        className="form-control my-1"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="form-control my-1"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
      />
      <select
        className="form-select my-1"
        value={formData.role}
        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <select
        className="form-select my-1"
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
      >
        <option value="engineer">Engineer</option>
        <option value="customer">Customer</option>
        <option value="reporting">Reporting</option>
      </select>
      <button type="submit" className="btn btn-primary mt-2">
        Add User
      </button>
    </form>
  );
}
