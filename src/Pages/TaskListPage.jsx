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
  const currentUser = useSelector((state) => state.auth.user); // ✅ logged in user

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleAddTask = (e) => {
    e.preventDefault();

    const taskToAdd = {
      ...newTask,
      id: Date.now(), // temporary unique ID
      createdBy: currentUser?.id, // ✅ set task's creator
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

  // ✅ Filter: Admin sees all, others see only their tasks
  const visibleTasks =
    currentUser?.role === "admin"
      ? allTasks
      : allTasks.filter((task) => task.assignedTo === currentUser?.name);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h2 fw-bold text-primary">
          <i className="bi bi-list-task me-2"></i>Task Management
        </h1>
        <button
          className={`btn ${showAddTask ? "btn-outline-danger" : "btn-primary"} shadow-sm`}
          onClick={() => setShowAddTask(!showAddTask)}
        >
          <i className={`bi ${showAddTask ? "bi-x-lg" : "bi-plus-lg"} me-1`}></i>
          {showAddTask ? "Cancel" : "Add Task"}
        </button>
      </div>

      {showAddTask && (
        <form onSubmit={handleAddTask} className="card shadow-sm p-4 mb-4">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Title</label>
              <input
                type="text"
                name="title"
                value={newTask.title}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Assigned To</label>
              <select
                name="assignedTo"
                value={newTask.assignedTo}
                onChange={handleChange}
                className="form-select"
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
              <label className="form-label">Description</label>
              <textarea
                name="description"
                value={newTask.description}
                onChange={handleChange}
                className="form-control"
                rows="3"
                required
              ></textarea>
            </div>
            <div className="col-md-6">
              <label className="form-label">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={newTask.dueDate}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6 d-flex align-items-end">
              <button type="submit" className="btn btn-success w-100 shadow-sm">
                <i className="bi bi-check2-circle me-1"></i>Save Task
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {visibleTasks.length === 0 ? (
          <p className="text-muted">No tasks available for you.</p>
        ) : (
          visibleTasks.map((task) => (
            <div className="col" key={task.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-dark fw-bold">{task.title}</h5>
                  <p className="card-text mb-1">
                    <strong>Description:</strong> {task.description}
                  </p>
                  <p className="card-text mb-1">
                    <strong>Assigned To:</strong> {task.assignedTo}
                  </p>
                  <p className="card-text mb-1">
                    <strong>Due Date:</strong> {task.dueDate}
                  </p>
                  <p className="card-text">
                    <strong>Status:</strong>
                    <select
                      className="form-select mt-1"
                      value={task.status}
                      onChange={(e) => handleStatusChange(task.id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
