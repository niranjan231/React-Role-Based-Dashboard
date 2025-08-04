import React from "react";
import { useSelector } from "react-redux";
import AddUserForm from "./AddUserForm";
import UsersTable from "./UsersTable";

export default function AdminDashboard() {
  const role = useSelector((state) => state.auth.role);

  return (
    <div className="container">
      {role === "admin" && <AddUserForm />}
      <UsersTable />
    </div>
  );
}
