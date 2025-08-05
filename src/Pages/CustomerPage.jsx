import React, { useState } from "react";
import { useSelector } from "react-redux";
import UserDetailModal from "./UserDetailModal";
import { useNavigate } from "react-router-dom";

export default function CustomerPage() {
  const users = useSelector((state) =>
    state.users.users.filter((user) => user.category === "customer")
  );

  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setShowModal(false);
  };

  return (
    <div className="container mt-4">
      {/* Back Button */}
      <button
        className="btn btn-outline-info mb-4 shadow-sm"
        onClick={() => navigate(-1)}
        style={{ minWidth: "110px", fontWeight: "600" }}
      >
        ← Back
      </button>

      <h2 className="mb-4 text-center text-info fw-bold border-bottom pb-3">
        👥 Customer List
      </h2>

      {users.length === 0 ? (
        <div className="alert alert-info shadow-sm text-center">
          No customers found.
        </div>
      ) : (
        <div className="row g-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="col-md-4"
              onClick={() => handleUserClick(user)}
              style={{ cursor: "pointer" }}
            >
              <div
                className="card h-100 shadow border-info rounded-3"
                style={{ transition: "transform 0.3s, box-shadow 0.3s" }}
              >
                <div className="card-header bg-info text-white fw-bold text-center">
                  {user.name}
                </div>
                <div className="card-body">
                  <p className="mb-2">
                    <strong>Email:</strong>{" "}
                    <span className="text-secondary">{user.email}</span>
                  </p>
                  <p className="mb-0">
                    <strong>Role:</strong>{" "}
                    <span className="badge bg-info text-white fw-semibold">
                      {user.role.toUpperCase()}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedUser && (
        <UserDetailModal
          user={selectedUser}
          show={showModal}
          handleClose={closeModal}
        />
      )}

      {/* Hover effect for cards */}
      <style>{`
        .card:hover {
          transform: translateY(-8px);
          box-shadow: 0 10px 20px rgba(13, 110, 253, 0.4); /* info blue shadow */
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
