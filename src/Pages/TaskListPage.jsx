import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateTaskStatus, addTask } from "../features/tasksSlice";
import { useNavigate } from "react-router-dom";

export default function TaskListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    assignedTo: "",
    status: "Pending",
    dueDate: "",
  });

  const users = useSelector((state) => state.users.users);
  const allTasks = useSelector((state) => state.tasks.tasks);
  const currentUser = useSelector((state) => state.auth.user);

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleAddTask = (e) => {
    e.preventDefault();

    const taskToAdd = {
      ...newTask,
      id: Date.now(),
      createdBy: currentUser?.id,
      createdAt: new Date().toISOString(), // Add creation timestamp
    };

    dispatch(addTask(taskToAdd));

    setNewTask({
      title: "",
      description: "",
      assignedTo: "",
      status: "Pending",
      dueDate: "",
    });

    setShowAddTask(false);
  };

  const handleStatusChange = (taskId, newStatus) => {
    dispatch(updateTaskStatus({ taskId, status: newStatus }));
  };

  // Filter: Admin sees all, others see only their tasks
  const visibleTasks =
    currentUser?.role === "admin"
      ? allTasks
      : allTasks.filter((task) => task.assignedTo === currentUser?.name);

  // Get status badge class - more robust version
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Pending":
        return "bg-warning text-dark";
      case "In Progress":
        return "bg-info text-white";
      case "Completed":
        return "bg-success text-white";
      default:
        return "bg-secondary text-white";
    }
  };

  // Format date for display with fallback
  const formatDate = (dateString) => {
    if (!dateString) return "No date";
    try {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (e) {
      return "Invalid date";
    }
  };

  // Robust user initials function with type checking
  const getUserInitials = (name) => {
    if (!name) return "?";
    
    // Handle both string and object types
    const displayName = typeof name === 'string' 
      ? name 
      : name.name || name.displayName || "?";
    
    const parts = displayName.toString().trim().split(/\s+/);
    
    return parts
      .slice(0, 2)
      .map(p => p[0] ? p[0].toUpperCase() : '')
      .join('');
  };

  // Check if a task is overdue
  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    try {
      const due = new Date(dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return due < today;
    } catch (e) {
      return false;
    }
  };

  // Stats calculations
  const totalTasks = allTasks.length;
  const pendingTasks = allTasks.filter(t => t.status === "Pending").length;
  const inProgressTasks = allTasks.filter(t => t.status === "In Progress").length;
  const completedTasks = allTasks.filter(t => t.status === "Completed").length;

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center">
          <h1 className="h2 fw-bold text-primary mb-0">
            <i className="bi bi-kanban-fill me-2"></i>Task Management Dashboard
          </h1>
          <span className="badge bg-primary ms-3">
            {visibleTasks.length} {visibleTasks.length === 1 ? "Task" : "Tasks"}
          </span>
        </div>
        <button
          className={`btn ${showAddTask ? "btn-outline-danger" : "btn-primary"} shadow-sm d-flex align-items-center`}
          onClick={() => setShowAddTask(!showAddTask)}
        >
          <i className={`bi ${showAddTask ? "bi-x-lg" : "bi-plus-lg"} me-1`}></i>
          {showAddTask ? "Cancel" : "Add Task"}
        </button>
      </div>

      {/* Stats cards */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card border-start border-primary border-4 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-uppercase text-muted small">Total Tasks</h6>
                  <h3 className="mb-0">{totalTasks}</h3>
                </div>
                <div className="icon-shape bg-primary text-white rounded-circle p-2">
                  <i className="bi bi-list-task"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card border-start border-info border-4 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-uppercase text-muted small">Pending</h6>
                  <h3 className="mb-0">{pendingTasks}</h3>
                </div>
                <div className="icon-shape bg-info text-white rounded-circle p-2">
                  <i className="bi bi-hourglass-split"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card border-start border-warning border-4 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-uppercase text-muted small">In Progress</h6>
                  <h3 className="mb-0">{inProgressTasks}</h3>
                </div>
                <div className="icon-shape bg-warning text-white rounded-circle p-2">
                  <i className="bi bi-lightning-charge"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card border-start border-success border-4 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-uppercase text-muted small">Completed</h6>
                  <h3 className="mb-0">{completedTasks}</h3>
                </div>
                <div className="icon-shape bg-success text-white rounded-circle p-2">
                  <i className="bi bi-check-circle"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Task Form */}
      {showAddTask && (
        <div className="card shadow-lg mb-4 border-0">
          <div className="card-header bg-primary text-white py-3">
            <h5 className="mb-0"><i className="bi bi-plus-circle me-2"></i>Create New Task</h5>
          </div>
          <form onSubmit={handleAddTask} className="card-body">
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-bold">Title</label>
                <input
                  type="text"
                  name="title"
                  value={newTask.title}
                  onChange={handleChange}
                  className="form-control form-control-lg"
                  placeholder="Enter task title"
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold">Assigned To</label>
                <select
                  name="assignedTo"
                  value={newTask.assignedTo}
                  onChange={handleChange}
                  className="form-select form-select-lg"
                  required
                >
                  <option value="">Select User</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.name}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-12">
                <label className="form-label fw-bold">Description</label>
                <textarea
                  name="description"
                  value={newTask.description}
                  onChange={handleChange}
                  className="form-control form-control-lg"
                  rows="3"
                  placeholder="Enter detailed description..."
                  required
                ></textarea>
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold">Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  value={newTask.dueDate}
                  onChange={handleChange}
                  className="form-control form-control-lg"
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold">Status</label>
                <select
                  name="status"
                  value={newTask.status}
                  onChange={handleChange}
                  className="form-select form-select-lg"
                  required
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="col-md-12">
                <div className="d-flex justify-content-end mt-3">
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary me-2"
                    onClick={() => setShowAddTask(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-success px-4">
                    <i className="bi bi-check2-circle me-1"></i>Create Task
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Tasks Grid */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {visibleTasks.length === 0 ? (
          <div className="col-12">
            <div className="card shadow-sm border-0">
              <div className="card-body text-center py-5">
                <div className="empty-state">
                  <i className="bi bi-clipboard-x text-muted" style={{ fontSize: "4rem" }}></i>
                  <h4 className="mt-3">No tasks found</h4>
                  <p className="text-muted">You don't have any tasks assigned to you.</p>
                  <button 
                    className="btn btn-primary mt-3"
                    onClick={() => setShowAddTask(true)}
                  >
                    <i className="bi bi-plus-lg me-1"></i>Create Your First Task
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          visibleTasks.map((task) => (
            <div className="col" key={task.id}>
              <div 
                className={`card h-100 shadow-sm border-start border-4 ${
                  task.status === "Completed" ? "border-success" : 
                  task.status === "In Progress" ? "border-info" : 
                  "border-warning"
                } hover-effect`}
              >
                <div className="card-header bg-transparent d-flex justify-content-between align-items-center">
                  <div>
                    <span className={`badge ${getStatusBadgeClass(task.status)}`}>
                      {task.status}
                    </span>
                  </div>
                  <div className="dropdown">
                    <button 
                      className="btn btn-sm btn-outline-secondary dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                    >
                      <i className="bi bi-three-dots"></i>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li><a className="dropdown-item" href="#"><i className="bi bi-pencil me-2"></i>Edit</a></li>
                      <li><a className="dropdown-item" href="#"><i className="bi bi-trash me-2"></i>Delete</a></li>
                      <li><a className="dropdown-item" href="#"><i className="bi bi-flag me-2"></i>Report</a></li>
                    </ul>
                  </div>
                </div>
                <div className="card-body">
                  <h5 className="card-title text-dark fw-bold mb-3 d-flex align-items-center">
                    <i className="bi bi-card-checklist me-2 text-primary"></i>
                    {task.title || "Untitled Task"}
                  </h5>
                  <p className="card-text mb-3 text-muted">
                    {task.description || "No description provided"}
                  </p>
                  
                  <div className="d-flex align-items-center mb-3">
                    <div className="avatar bg-light-info text-info fw-bold me-2">
                      {getUserInitials(task.assignedTo)}
                    </div>
                    <div>
                      <div className="small text-muted">Assigned To</div>
                      <div className="fw-medium">{task.assignedTo || "Unassigned"}</div>
                    </div>
                  </div>
                  
                  <div className="d-flex justify-content-between mb-3">
                    <div>
                      <div className="small text-muted">Created By</div>
                      <div className="fw-medium">
                        {users.find(u => u.id === task.createdBy)?.name || "System"}
                      </div>
                    </div>
                    <div className="text-end">
                      <div className="small text-muted">Due Date</div>
                      <div className={`fw-medium ${isOverdue(task.dueDate) ? 'text-danger' : ''}`}>
                        {formatDate(task.dueDate)}
                        {isOverdue(task.dueDate) && (
                          <span className="badge bg-danger ms-2">Overdue</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="form-label fw-medium">Update Status</label>
                    <select
                      className={`form-select ${task.status === "Completed" ? "bg-success-subtle" : ""}`}
                      value={task.status || "Pending"}
                      onChange={(e) => handleStatusChange(task.id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>
                <div className="card-footer bg-transparent d-flex justify-content-between">
                  <small className="text-muted">
                    Created: {formatDate(task.createdAt || new Date().toISOString())}
                  </small>
                  <button 
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => navigate(`/tasks/${task.id}`)}
                  >
                    <i className="bi bi-eye me-1"></i>View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Custom CSS */}
      <style jsx>{`
        .icon-shape {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease;
        }
        .icon-shape:hover {
          transform: scale(1.1);
        }
        .hover-effect {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-effect:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
        .avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.875rem;
          background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
          color: white;
        }
        .empty-state {
          max-width: 400px;
          margin: 0 auto;
          padding: 2rem 0;
        }
        .card-header {
          border-bottom: 1px solid rgba(0,0,0,0.05);
        }
        .card-footer {
          border-top: 1px solid rgba(0,0,0,0.05);
          background-color: rgba(248, 249, 250, 0.5);
        }
        .form-control-lg, .form-select-lg {
          padding: 0.75rem 1rem;
          font-size: 1rem;
          border-radius: 0.5rem;
        }
        .border-warning {
          border-left-color: #ffc107 !important;
        }
        .border-info {
          border-left-color: #0dcaf0 !important;
        }
        .border-success {
          border-left-color: #198754 !important;
        }
        .bg-success-subtle {
          background-color: #d1e7dd !important;
        }
      `}</style>
    </div>
  );
}