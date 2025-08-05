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
    <nav className="navbar navbar-expand-lg shadow-sm py-2" style={{
      background: "linear-gradient(90deg, #0062cc 0%, #5a13c8 100%)",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <div className="container">
        {/* Brand */}
        <Link to="/dashboard" className="navbar-brand text-white d-flex align-items-center" 
          style={{
            fontWeight: 700,
            fontSize: "1.8rem",
            letterSpacing: "0.5px",
            textShadow: "0 2px 4px rgba(0,0,0,0.2)",
            transition: "transform 0.3s ease"
          }}>
          <i className="bi bi-speedometer2 me-2"></i>
          Dashboard
        </Link>

        {/* Hamburger menu */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          style={{
            border: "none",
            outline: "none",
            boxShadow: "none"
          }}
        >
          <span className="navbar-toggler-icon text-white" 
            style={{ filter: "invert(1)" }} />
        </button>

        {/* Navbar content */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {role === "admin" && (
              <>
                <li className="nav-item mx-1">
                  <NavLink to="/engineer" icon="bi-cpu">
                    Engineer
                  </NavLink>
                </li>
                <li className="nav-item mx-1">
                  <NavLink to="/customer" icon="bi-people">
                    Customer
                  </NavLink>
                </li>
                <li className="nav-item mx-1">
                  <NavLink to="/reporting" icon="bi-graph-up">
                    Reporting
                  </NavLink>
                </li>
                <li className="nav-item mx-1">
                  <Link
                    to="/tasks"
                    className="nav-link fw-semibold d-flex align-items-center px-3 py-2"
                    style={{
                      color: "#fff",
                      background: "rgba(255, 173, 51, 0.15)",
                      borderRadius: "8px",
                      border: "1px solid rgba(255, 173, 51, 0.3)",
                      transition: "all 0.3s ease",
                      marginLeft: "10px"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(255, 173, 51, 0.3)";
                      e.currentTarget.style.boxShadow = "0 0 12px rgba(255, 173, 51, 0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255, 173, 51, 0.15)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <i className="bi bi-list-task me-2"></i>
                    Tasks
                  </Link>
                </li>
              </>
            )}
          </ul>

          {isAuthenticated && (
            <div className="d-flex align-items-center gap-3">
              <div className="d-flex align-items-center text-white fw-semibold px-3 py-1 rounded"
                style={{
                  background: "rgba(255, 255, 255, 0.12)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  fontSize: "0.9rem"
                }}>
                <i className="bi bi-person-circle me-2"></i>
                Logged as: 
                <span className="badge ms-2 py-1" 
                  style={{
                    background: "linear-gradient(135deg, #ffc107 0%, #ff9800 100%)",
                    color: "#000",
                    fontWeight: 700,
                    borderRadius: "6px",
                    padding: "0.35em 0.7em",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                  }}>
                  {role.toUpperCase()}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="btn d-flex align-items-center fw-bold"
                style={{
                  background: "linear-gradient(135deg, #ff9a00 0%, #ff6a00 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "0.5rem 1.2rem",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.15)",
                  transition: "all 0.3s ease",
                  position: "relative",
                  overflow: "hidden"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.15)";
                }}
              >
                <i className="bi bi-box-arrow-right me-2"></i>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

// Reusable NavLink component for consistent styling
function NavLink({ to, icon, children }) {
  return (
    <Link 
      to={to} 
      className="nav-link text-white d-flex align-items-center px-3 py-2"
      style={{
        fontWeight: 500,
        borderRadius: "8px",
        transition: "all 0.3s ease",
        opacity: 0.9,
        margin: "0 2px"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
        e.currentTarget.style.opacity = "1";
        e.currentTarget.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.opacity = "0.9";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <i className={`${icon} me-2`}></i>
      {children}
    </Link>
  );
}