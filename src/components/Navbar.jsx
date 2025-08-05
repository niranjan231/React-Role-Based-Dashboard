import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice";

export default function Navbar() {
  const { role, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        {/* Brand */}
        <Link to="/dashboard" className="navbar-brand fw-bold fs-3 text-uppercase">
         Dashboard
        </Link>

        {/* Hamburger menu for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Navbar links and right section */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Left menu */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {role === "admin" && (
              <>
                <li className="nav-item">
                  <Link to="/engineer" className="nav-link fw-semibold">
                    Engineer
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/customer" className="nav-link fw-semibold">
                    Customer
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/reporting" className="nav-link fw-semibold">
                    Reporting
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Right side user info and logout */}
          {isAuthenticated && (
            <div className="d-flex align-items-center gap-3">
              <span className="text-white fw-semibold">
                Logged in as: <span className="badge bg-warning text-dark">{role.toUpperCase()}</span>
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
        </div>
      </div>
    </nav>
  );
}
