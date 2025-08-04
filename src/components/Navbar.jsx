import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice"; // adjust path as per your project

export default function Navbar() {
  const { role, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 shadow-sm">
      <Link to="/dashboard" className="navbar-brand fw-bold">
        Dashboard
      </Link>

      <div className="navbar-nav me-auto">
        {/* Links for all users */}
        {/* <Link to="/dashboard" className="nav-link">
          Home
        </Link> */}

        {/* Admin-only links */}
        {role === "admin" && (
          <>
            <Link to="/engineer" className="nav-link">
              Engineer
            </Link>
            <Link to="/customer" className="nav-link">
              Customer
            </Link>
            <Link to="/reporting" className="nav-link">
              Reporting
            </Link>
          </>
        )}
      </div>

      {isAuthenticated && (
        <div className="d-flex align-items-center">
          <span className="text-light me-3">
            Logged in as: <strong>{role}</strong>
          </span>
          <button
            onClick={handleLogout}
            className="btn btn-outline-light btn-sm"
            title="Logout"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
