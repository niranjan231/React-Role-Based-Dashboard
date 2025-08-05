// src/Pages/CustomerPage.jsx
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
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  const navigate = useNavigate();

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setShowModal(false);
  };

  // Filter customers by role
  const filteredUsers = users.filter(user => {
    const matchesRole = filter === "all" || user.role === filter;
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesSearch;
  });

  // Generate customer statistics
  const customerStats = {
    total: users.length,
    premium: users.filter(user => user.role === "premium").length,
    regular: users.filter(user => user.role === "regular").length
  };

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-12 mb-4">
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <button
              className="btn btn-gradient-info d-flex align-items-center shadow-sm mb-3 mb-md-0"
              onClick={() => navigate(-1)}
              style={{ minWidth: "110px", fontWeight: "600" }}
            >
              <i className="bi bi-arrow-left me-2"></i> Back
            </button>
            
            <div className="text-center mb-3 mb-md-0">
              <h2 className="mb-0 fw-bold text-gradient-info">
                <i className="bi bi-people me-2"></i>Customer Portal
              </h2>
              <p className="text-muted mb-0">Manage and engage with your valued customers</p>
            </div>
            
            <div className="d-flex gap-2">
              <button className="btn btn-info shadow-sm">
                <i className="bi bi-download me-1"></i> Export
              </button>
              <button className="btn btn-outline-info shadow-sm">
                <i className="bi bi-funnel me-1"></i> Filters
              </button>
            </div>
          </div>
          
          <div className="border-bottom border-info opacity-25 mt-3"></div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div className="card bg-gradient-info text-white shadow border-0 rounded-3 h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="card-title opacity-75">Total Customers</h5>
                  <h2 className="mb-0">{customerStats.total}</h2>
                </div>
                <div className="bg-white bg-opacity-25 rounded-circle p-3">
                  <i className="bi bi-people-fill fs-2"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-4 mb-3">
          <div className="card bg-gradient-primary text-white shadow border-0 rounded-3 h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="card-title opacity-75">Premium</h5>
                  <h2 className="mb-0">{customerStats.premium}</h2>
                </div>
                <div className="bg-white bg-opacity-25 rounded-circle p-3">
                  <i className="bi bi-star-fill fs-2"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-4 mb-3">
          <div className="card bg-gradient-success text-white shadow border-0 rounded-3 h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="card-title opacity-75">Regular</h5>
                  <h2 className="mb-0">{customerStats.regular}</h2>
                </div>
                <div className="bg-white bg-opacity-25 rounded-circle p-3">
                  <i className="bi bi-person fs-2"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card shadow-sm border-0 rounded-3 mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text bg-info text-white border-info">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-info"
                  placeholder="Search customers by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text bg-info text-white border-info">
                  <i className="bi bi-filter"></i>
                </span>
                <select 
                  className="form-select border-info"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="premium">Premium</option>
                  <option value="regular">Regular</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Cards */}
      {filteredUsers.length === 0 ? (
        <div className="card shadow border-0 rounded-3">
          <div className="card-body text-center py-5">
            <i className="bi bi-person display-5 text-info mb-3"></i>
            <h4 className="text-info fw-bold">No customers found</h4>
            <p className="text-muted">Try adjusting your search filters or add new customers</p>
            <button className="btn btn-info mt-2">
              <i className="bi bi-plus-circle me-1"></i> Add Customer
            </button>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {filteredUsers.map((user) => (
            <div key={user.id} className="col-lg-4 col-md-6">
              <div 
                className="card h-100 shadow border-0 rounded-3 hover-lift"
                onClick={() => handleUserClick(user)}
                style={{ cursor: "pointer" }}
              >
                <div className="card-header bg-gradient-info text-white d-flex justify-content-between align-items-center border-0">
                  <h5 className="mb-0 fw-bold">{user.name}</h5>
                  <span className={`badge ${user.role === 'premium' ? 'bg-warning' : 'bg-secondary'} rounded-pill`}>
                    {user.role.toUpperCase()}
                  </span>
                </div>
                <div className="card-body position-relative">
                  <div className="avatar-container position-absolute top-0 start-50 translate-middle">
                    <div className="avatar bg-info bg-opacity-10 text-info rounded-circle d-flex align-items-center justify-content-center">
                      <i className="bi bi-person fs-2"></i>
                    </div>
                  </div>
                  <div className="mt-4 pt-3">
                    <div className="d-flex align-items-center mb-3">
                      <i className="bi bi-envelope me-2 text-info"></i>
                      <span className="text-truncate">{user.email}</span>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                      <i className="bi bi-geo-alt me-2 text-info"></i>
                      <span>{user.location || "Location not specified"}</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <i className="bi bi-currency-dollar me-2 text-info"></i>
                      <span>Total spent: ${user.totalSpent || "0.00"}</span>
                    </div>
                  </div>
                </div>
                <div className="card-footer bg-light d-flex justify-content-between border-0">
                  <span className="text-muted small">ID: #{user.id}</span>
                  <span className="badge bg-success rounded-pill">
                    <i className="bi bi-check-circle me-1"></i>Active
                  </span>
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

      {/* Custom Styles */}
      <style>{`
        .text-gradient-info {
          background: linear-gradient(90deg, #17a2b8 0%, #2c9faf 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .btn-gradient-info {
          background: linear-gradient(90deg, #17a2b8 0%, #2c9faf 100%);
          border: none;
          color: white;
          transition: all 0.3s;
        }
        
        .btn-gradient-info:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(23, 162, 184, 0.3);
          color: white;
        }
        
        .bg-gradient-info {
          background: linear-gradient(90deg, #17a2b8 0%, #2c9faf 100%);
        }
        
        .bg-gradient-primary {
          background: linear-gradient(90deg, #4e73df 0%, #224abe 100%);
        }
        
        .bg-gradient-success {
          background: linear-gradient(90deg, #1cc88a 0%, #17a673 100%);
        }
        
        .hover-lift {
          transition: transform 0.3s, box-shadow 0.3s;
        }
        
        .hover-lift:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
        }
        
        .avatar-container {
          width: 60px;
          height: 60px;
          margin-top: -40px;
        }
        
        .avatar {
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          border: 2px solid #17a2b8;
        }
      `}</style>
    </div>
  );
}