import React, { useState } from "react";

export default function CreateUserModal({ show, onClose, onCreate }) {
  // Always call hooks at the top
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    category: "engineer",
    role: "user",
  });

  // Reset form when modal closes or opens (optional)
  React.useEffect(() => {
    if (show) {
      setFormData({
        name: "",
        email: "",
        password: "",
        category: "engineer",
        role: "user",
      });
    }
  }, [show]);

  if (!show) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(formData);
    onClose();
  };

  return (
    <div
      className="modal-backdrop"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1050,
      }}
    >
      <div
        className="modal-content p-4 bg-white rounded"
        style={{ width: "400px", boxShadow: "0 0 10px #00000050" }}
      >
        <h4 className="mb-3">Create New User</h4>
        <form onSubmit={handleSubmit}>
          <input
            required
            type="text"
            name="name"
            placeholder="Name"
            className="form-control mb-2"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            required
            type="text"
            name="email"
            placeholder="Username"
            className="form-control mb-2"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            required
            type="password"
            name="password"
            placeholder="Password"
            className="form-control mb-2"
            value={formData.password}
            onChange={handleChange}
          />
          <select
            name="category"
            className="form-select mb-2"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="engineer">Engineer</option>
            <option value="customer">Customer</option>
            <option value="reporting">Reporting</option>
          </select>
          <select
            name="role"
            className="form-select mb-3"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">
              Create
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
