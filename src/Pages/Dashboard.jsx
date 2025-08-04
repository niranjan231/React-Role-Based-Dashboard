// src/pages/Dashboard.jsx
import Navbar from "../components/Navbar";
import UsersTable from "../features/UsersTable";

export default function Dashboard() {
  return (
    <div>
      <Navbar />
      <div className="container mt-3">
        <h3>User List</h3>
        <UsersTable />
      </div>
    </div>
  );
}
