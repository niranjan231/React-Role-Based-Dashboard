// src/Pages/EngineerPage.jsx
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function EngineerPage() {
  const engineers = useSelector((state) =>
    state.users.users.filter((user) => user.category === "engineer")
  );
  
  const [selectedEngineer, setSelectedEngineer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  const navigate = useNavigate();

  const handleEngineerClick = (engineer) => {
    setSelectedEngineer(engineer);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedEngineer(null);
    setShowModal(false);
  };

  // Filter engineers by role
  const filteredEngineers = engineers.filter(engineer => {
    const matchesRole = filter === "all" || engineer.role === filter;
    const matchesSearch = engineer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          engineer.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesSearch;
  });

  // Generate engineer statistics
  const engineerStats = {
    total: engineers.length,
    admins: engineers.filter(engineer => engineer.role === "admin").length,
    users: engineers.filter(engineer => engineer.role === "user").length
  };

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-12 mb-4">
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <button
              className="btn btn-gradient-primary d-flex align-items-center shadow-sm mb-3 mb-md-0"
              onClick={() => navigate(-1)}
              style={{ minWidth: "110px", fontWeight: "600" }}
            >
              <i className="bi bi-arrow-left me-2"></i> Back
            </button>
            
            <div className="text-center mb-3 mb-md-0">
              <h2 className="mb-0 fw-bold text-gradient-primary">
                <i className="bi bi-cpu me-2"></i>Engineering Team
              </h2>
              <p className="text-muted mb-0">Manage and collaborate with your engineering specialists</p>
            </div>
            
            <div className="d-flex gap-2">
              <button className="btn btn-primary shadow-sm">
                <i className="bi bi-download me-1"></i> Export
              </button>
              <button className="btn btn-outline-primary shadow-sm">
                <i className="bi bi-funnel me-1"></i> Filters
              </button>
            </div>
          </div>
          
          <div className="border-bottom border-primary opacity-25 mt-3"></div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div className="card bg-gradient-primary text-white shadow border-0 rounded-3 h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="card-title opacity-75">Total Engineers</h5>
                  <h2 className="mb-0">{engineerStats.total}</h2>
                </div>
                <div className="bg-white bg-opacity-25 rounded-circle p-3">
                  <i className="bi bi-people-fill fs-2"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-4 mb-3">
          <div className="card bg-gradient-info text-white shadow border-0 rounded-3 h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="card-title opacity-75">Admins</h5>
                  <h2 className="mb-0">{engineerStats.admins}</h2>
                </div>
                <div className="bg-white bg-opacity-25 rounded-circle p-3">
                  <i className="bi bi-shield-shaded fs-2"></i>
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
                  <h5 className="card-title opacity-75">Regular Users</h5>
                  <h2 className="mb-0">{engineerStats.users}</h2>
                </div>
                <div className="bg-white bg-opacity-25 rounded-circle p-3">
                  <i className="bi bi-person-check fs-2"></i>
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
                <span className="input-group-text bg-primary text-white border-primary">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-primary"
                  placeholder="Search engineers by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text bg-primary text-white border-primary">
                  <i className="bi bi-filter"></i>
                </span>
                <select 
                  className="form-select border-primary"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All Roles</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Engineer Cards */}
      {filteredEngineers.length === 0 ? (
        <div className="card shadow border-0 rounded-3">
          <div className="card-body text-center py-5">
            <i className="bi bi-cpu display-5 text-primary mb-3"></i>
            <h4 className="text-primary fw-bold">No engineers found</h4>
            <p className="text-muted">Try adjusting your search filters or add new engineers</p>
            <button className="btn btn-primary mt-2">
              <i className="bi bi-plus-circle me-1"></i> Add Engineer
            </button>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {filteredEngineers.map((engineer) => (
            <div key={engineer.id} className="col-lg-4 col-md-6">
              <div 
                className="card h-100 shadow border-0 rounded-3 hover-lift"
                onClick={() => handleEngineerClick(engineer)}
                style={{ cursor: "pointer" }}
              >
                <div className="card-header bg-gradient-primary text-white d-flex justify-content-between align-items-center border-0">
                  <h5 className="mb-0 fw-bold">{engineer.name}</h5>
                  <span className={`badge ${engineer.role === 'admin' ? 'bg-danger' : 'bg-info'} rounded-pill`}>
                    {engineer.role.toUpperCase()}
                  </span>
                </div>
                <div className="card-body position-relative">
                  <div className="avatar-container position-absolute top-0 start-50 translate-middle">
                    <div className="avatar bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center">
                      <i className="bi bi-cpu fs-2"></i>
                    </div>
                  </div>
                  <div className="mt-4 pt-3">
                    <div className="d-flex align-items-center mb-3">
                      <i className="bi bi-envelope me-2 text-primary"></i>
                      <span className="text-truncate">{engineer.email}</span>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                      <i className="bi bi-tools me-2 text-primary"></i>
                      <span>Specialization: {engineer.specialization || "General"}</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <i className="bi bi-calendar me-2 text-primary"></i>
                      <span>Joined: {new Date().toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="card-footer bg-light d-flex justify-content-between border-0">
                  <span className="text-muted small">ID: #{engineer.id}</span>
                  <span className="badge bg-success rounded-pill">
                    <i className="bi bi-check-circle me-1"></i>Active
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Engineer Detail Modal */}
      {selectedEngineer && (
        <div 
          className="modal-backdrop"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: showModal ? 'flex' : 'none',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1050
          }}
          onClick={closeModal}
        >
          <div 
            className="modal-content rounded-3 shadow-lg"
            style={{
              backgroundColor: 'white',
              width: '90%',
              maxWidth: '500px',
              overflow: 'hidden'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header bg-gradient-primary text-white border-0">
              <h5 className="modal-title fw-bold">{selectedEngineer.name}</h5>
              <button 
                type="button" 
                className="btn-close btn-close-white" 
                onClick={closeModal}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body p-4">
              <div className="d-flex flex-column gap-3">
                <div>
                  <h6 className="text-primary opacity-75 mb-1">Email</h6>
                  <p>{selectedEngineer.email}</p>
                </div>
                <div>
                  <h6 className="text-primary opacity-75 mb-1">Role</h6>
                  <p className="badge bg-primary">{selectedEngineer.role}</p>
                </div>
                <div>
                  <h6 className="text-primary opacity-75 mb-1">Specialization</h6>
                  <p>{selectedEngineer.specialization || "Not specified"}</p>
                </div>
                <div>
                  <h6 className="text-primary opacity-75 mb-1">Category</h6>
                  <p>{selectedEngineer.category}</p>
                </div>
                <div>
                  <h6 className="text-primary opacity-75 mb-1">Engineer ID</h6>
                  <p className="text-muted">#{selectedEngineer.id}</p>
                </div>
              </div>
            </div>
            <div className="modal-footer border-0">
              <button 
                className="btn btn-outline-primary" 
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Styles - Same as ReportingPage with primary color variant */}
      <style>{`
        .text-gradient-primary {
          background: linear-gradient(90deg, #4e73df 0%, #224abe 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .btn-gradient-primary {
          background: linear-gradient(90deg, #4e73df 0%, #224abe 100%);
          border: none;
          color: white;
          transition: all 0.3s;
        }
        
        .btn-gradient-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(78, 115, 223, 0.3);
          color: white;
        }
        
        .bg-gradient-primary {
          background: linear-gradient(90deg, #4e73df 0%, #224abe 100%);
        }
        
        .bg-gradient-info {
          background: linear-gradient(90deg, #36b9cc 0%, #2c9faf 100%);
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
          border: 2px solid #4e73df;
        }
      `}</style>
    </div>
  );
}