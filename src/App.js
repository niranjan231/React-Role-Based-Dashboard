import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';

import EngineerPage from "./Pages/EngineerPage";
import CustomerPage from "./Pages/CustomerPage";
import ReportingPage from "./Pages/ReportingPage";
import Dashboard from "./Pages/Dashboard";
import LoginPage from "./Pages/LoginPage";
import TaskListPage from "./Pages/TaskListPage";  // Import your new page
import Navbar from "./components/Navbar";

function AdminRoute({ children }) {
  const { role, isAuthenticated } = useSelector((state) => state.auth);
  if (!isAuthenticated) return <Navigate to="/" />;
  if (role !== "admin") return <Navigate to="/dashboard" />;
  return children;
}

export default function App() {
  return (
<>
<Navbar/>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />

      {/* Admin only pages */}
      <Route
        path="/engineer"
        element={
          <AdminRoute>
            <EngineerPage />
          </AdminRoute>
        }
      />
      <Route
        path="/customer"
        element={
          <AdminRoute>
            <CustomerPage />
          </AdminRoute>
        }
      />
      <Route
        path="/reporting"
        element={
          <AdminRoute>
            <ReportingPage />
          </AdminRoute>
        }
      />

      <Route
        path="/tasks"
        element={
          <RequireAuth>
            <TaskListPage />
          </RequireAuth>
        }
      />

    </Routes>
    </>
  );
}

// RequireAuth to check if user logged in (either admin or user)
function RequireAuth({ children }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  if (!isAuthenticated) return <Navigate to="/" />;
  return children;
}
