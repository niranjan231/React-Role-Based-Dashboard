import React, { useState } from "react";
import { useSelector } from "react-redux";
import UserDetailModal from "./UserDetailModal";
import { useNavigate } from "react-router-dom";

export default function ReportingPage() {
  const users = useSelector((state) =>
    state.users.users.filter((user) => user.category === "reporting")
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
        className="btn btn-outline-warning mb-4 shadow-sm"
        onClick={() => navigate(-1)}
        style={{ minWidth: "110px", fontWeight: "600" }}
      >
        ← Back
      </button>

      <h2 className="mb-4 text-center text-warning fw-bold border-bottom pb-3">
        📊 Reporting Team
      </h2>

      {users.length === 0 ? (
        <div className="alert alert-warning shadow-sm text-center">
          No reporting users found.
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
                className="card h-100 shadow border-warning rounded-3"
                style={{ transition: "transform 0.3s, box-shadow 0.3s" }}
              >
                <div className="card-header bg-warning text-white fw-bold text-center">
                  {user.name}
                </div>
                <div className="card-body">
                  <p className="mb-2">
                    <strong>Email:</strong>{" "}
                    <span className="text-secondary">{user.email}</span>
                  </p>
                  <p className="mb-0">
                    <strong>Role:</strong>{" "}
                    <span className="badge bg-warning text-dark fw-semibold">
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
          show={showModal}
          handleClose={closeModal}
          user={selectedUser}
        />
      )}

      {/* Hover effect for cards */}
      <style>{`
        .card:hover {
          transform: translateY(-8px);
          box-shadow: 0 10px 20px rgba(255, 193, 7, 0.4); /* warning yellow shadow */
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
